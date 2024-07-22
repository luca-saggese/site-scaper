import React, { useState } from 'react';
import { Form } from 'react-final-form';

import Button from '@Components/Button';
import FormError from '@Components/Form/FormError/FormError';
import FormField from '@Components/Form/FormField';
import TextInput, { TextInputProps } from '@Components/Form/TextInput';
import Typography from '@Components/Typography';
import { useResetPasswordMutation } from '@Graphql/graphqlTypes.generated';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import { composeValidators, email, required } from '@Utils/form';
import { callMutationForForm } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';

import styles from './ResetPasswordForm.module.scss';

export interface ResetPasswordFormProps {}

interface ResetPasswordFormValues {
  email: string;
}

const ResetPasswordForm: React.FunctionComponent<ResetPasswordFormProps> = () => {
  const t = useTranslation();
  const [resetCompleted, setResetCompleted] = useState(false);

  const [resetPassword] = useResetPasswordMutation({
    onCompleted: () => setResetCompleted(true),
  });
  const onSubmitHandler = (values: ResetPasswordFormValues) => {
    return callMutationForForm(resetPassword({ variables: { input: values } }));
  };

  return (
    <>
      {resetCompleted ? (
        <Typography>{t('msg_password_reset_sent')}</Typography>
      ) : (
        <Form
          onSubmit={onSubmitHandler}
          render={({ handleSubmit, submitting, submitError, dirtySinceLastSubmit }) => {
            return (
              <form onSubmit={handleSubmit} className={sharedAuthStyles.form}>
                {submitError && !dirtySinceLastSubmit && <FormError>{t(submitError)}</FormError>}
                <FormField<TextInputProps<string>>
                  name="email"
                  component={TextInput}
                  autoComplete="username"
                  label={t('msg_field_label_reset_password_email')}
                  validate={composeValidators(required(), email)}
                />
                <Button className={styles.button} loading={submitting}>
                  {t('msg_label_reset_password_btn')}
                </Button>
              </form>
            );
          }}
        />
      )}
    </>
  );
};

export default ResetPasswordForm;
