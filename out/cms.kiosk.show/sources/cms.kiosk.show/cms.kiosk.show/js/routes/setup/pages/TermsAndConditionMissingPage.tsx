import React from 'react';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';

import Button from '@Components/Button';
import FormError from '@Components/Form/FormError/FormError';
import FormField from '@Components/Form/FormField';
import Toggle from '@Components/Form/Toggle';
import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import TermsAndConditionsLabel from '@Components/TermsAndConditionsLabel';
import { RouteConfig } from '@Config/routes';
import { MeDocument, useMeQuery, useUpdateUserMutation } from '@Graphql/graphqlTypes.generated';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import AuthPageLayout from '@Routes/auth/shared/AuthLayout/AuthPageLayout';
import LogoHeader from '@Routes/auth/shared/LogoHeader/LogoHeader';
import { required } from '@Utils/form';
import { callMutationForForm } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';

interface FormValues {
  acceptTermsAndConditions: boolean;
  newsletterOptIn: boolean;
}

const TermsAndConditionMissingPage: React.FunctionComponent = () => {
  const t = useTranslation();
  const history = useHistory();
  const meQuery = useMeQuery();

  const [updateUserMutation] = useUpdateUserMutation({
    onCompleted: () => {
      history.replace(RouteConfig.Home.buildLink());
    },
    refetchQueries: [{ query: MeDocument }],
  });

  const id = meQuery.data?.me.info.id;

  if (!id) {
    return null;
  }

  const onSubmitHandler = (values: FormValues) => {
    return callMutationForForm(updateUserMutation({ variables: { input: { id, ...values } } }));
  };

  return (
    <AuthPageLayout>
      <LogoHeader text={t('msg_label_registration_user_settings')} />
      <ContentBox boxStyle={ContextBoxStyle.Large} className={sharedAuthStyles.content}>
        <Form<FormValues>
          onSubmit={onSubmitHandler}
          render={({ handleSubmit, submitting, submitError, dirtySinceLastSubmit }) => {
            return (
              <form onSubmit={handleSubmit} className={sharedAuthStyles.form}>
                {submitError && !dirtySinceLastSubmit && <FormError>{t(submitError)}</FormError>}
                <FormError>{t('msg_terms_and_conditions_mandatory')}</FormError>
                <FormField
                  name="acceptTermsAndConditions"
                  component={Toggle}
                  type="checkbox"
                  label={<TermsAndConditionsLabel />}
                  validate={required('msg_error_boolean_required')}
                />
                <FormField
                  name="newsletterOptIn"
                  component={Toggle}
                  type="checkbox"
                  label={t('msg_field_label_newsletter_opt_in')}
                />
                <Button loading={submitting}>{t('msg_common_save')}</Button>
              </form>
            );
          }}
        />
      </ContentBox>
    </AuthPageLayout>
  );
};

export default TermsAndConditionMissingPage;
