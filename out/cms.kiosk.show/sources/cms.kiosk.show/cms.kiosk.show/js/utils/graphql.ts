import { ApolloError } from '@apollo/client';
import { FORM_ERROR } from 'final-form';
import { ExecutionResult, GraphQLError } from 'graphql';

import { toastError } from '@Components/Toastify';
import { getErrorCodeTranslationKey } from '@Config/errors';
import { logError } from '@Utils/helpers';
import { MessageKey } from '@Utils/i18n';

interface CustomGraphqlError extends GraphQLError {
  field?: string;
}

export const handleSubmissionErrorsForGraphqlQuery = (errors: ApolloError) => {
  const errorData: Record<string, string> = {};
  const { graphQLErrors }: { graphQLErrors: readonly CustomGraphqlError[] } = errors;
  if (graphQLErrors && graphQLErrors.length) {
    graphQLErrors.forEach((error) => {
      if (error.field) {
        errorData[error.field] = getErrorCodeTranslationKey(error.message);
      }
    });
    if (!Object.keys(errorData).length) {
      errorData[FORM_ERROR] = getErrorCodeTranslationKey(graphQLErrors[0]?.message) || 'msg_error_unexpected';
    }
  }
  return errorData;
};

export const buildFormErrors = (error: ApolloError) => {
  return handleSubmissionErrorsForGraphqlQuery(error);
};

export const callMutationForForm = (
  mutation: Promise<ExecutionResult>,
  callback?: (errors: Record<string, string>) => void
) => {
  return mutation.catch((e) => {
    const errors = buildFormErrors(e);
    if (callback) {
      callback(errors);
    }
    return errors;
  });
};

export const mutationErrorHandler = (toastTitle: MessageKey) => (error: ApolloError) => {
  const errorCode = error?.graphQLErrors?.[0]?.message;
  if (!errorCode) {
    logError(error);
  }
  toastError(toastTitle, getErrorCodeTranslationKey(errorCode));
};
