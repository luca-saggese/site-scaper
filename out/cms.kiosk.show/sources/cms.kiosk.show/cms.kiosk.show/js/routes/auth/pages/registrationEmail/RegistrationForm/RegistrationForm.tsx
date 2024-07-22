import React from 'react';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';

import Button from '@Components/Button';
import FormError from '@Components/Form/FormError/FormError';
import FormField from '@Components/Form/FormField';
import TextInput, { TextInputProps } from '@Components/Form/TextInput';
import Toggle from '@Components/Form/Toggle';
import TermsAndConditionsLabel from '@Components/TermsAndConditionsLabel';
import { LocalStorage, SessionStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { useAuthMutation, useRegisterMutation } from '@Graphql/graphqlTypes.generated';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import analytics from '@Utils/analytics';
import { composeValidators, email, min, password, required } from '@Utils/form';
import { buildFormErrors } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';
import { setValueToLocalStorage } from '@Utils/localStorage';
import { deleteFromSessionStorage, getFromSessionStorage } from '@Utils/sessionStorage';
import { sendGoogleAnalyticsRequest } from '@Utils/tracking';

export interface RegistrationFormProps {}

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  acceptTermsAndConditions: boolean;
  newsletterOptIn: boolean;
}

const RegistrationPage: React.FunctionComponent<RegistrationFormProps> = () => {
  const t = useTranslation();
  const history = useHistory();
  const [login] = useAuthMutation();
  const [register] = useRegisterMutation();
  const onSubmitHandler = (values: RegistrationFormValues) => {
    return register({ variables: { input: values } })
      .then((registerData) => {
        const cid = getFromSessionStorage(SessionStorage.Cid);

        if (cid) {
          sendGoogleAnalyticsRequest({ cid, action: 'signup' });
          deleteFromSessionStorage(SessionStorage.Cid);
        }

        analytics.cacheTrackEvent('user_create', { type: 'email', event_location: 'public' });

        login({ variables: { email: values.email, password: values.password } })
          .then((loginData) => {
            if (!loginData.data) {
              history.replace(RouteConfig.Login.buildLink());
              return;
            }

            const { token } = loginData.data.tokenAuth;
            analytics.cacheTrackEvent('user_login', { type: 'email', event_location: 'public' });
            setValueToLocalStorage(LocalStorage.UserToken, token);
          })
          .catch(() => {
            history.replace(RouteConfig.Login.buildLink());
          });
        return registerData;
      })
      .catch((e) => {
        return buildFormErrors(e);
      });
  };

  return (
    <Form
      onSubmit={onSubmitHandler}
      render={({ handleSubmit, submitting, submitError, dirtySinceLastSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={sharedAuthStyles.form}>
            {submitError && !dirtySinceLastSubmit && <FormError>{t(submitError)}</FormError>}
            <FormField<TextInputProps<string>>
              name="name"
              component={TextInput}
              autoComplete="name"
              label={t('msg_field_label_create_acc_name')}
              validate={required()}
            />
            <FormField<TextInputProps<string>>
              name="email"
              component={TextInput}
              autoComplete="username"
              label={t('msg_field_label_create_acc_email')}
              validate={composeValidators(required(), email)}
            />
            <FormField<TextInputProps<string>>
              name="password"
              component={TextInput}
              tParams={{ min: 8 }}
              type="password"
              autoComplete="current-password"
              label={t('msg_field_label_create_acc_password')}
              validate={composeValidators(required(), min(8), password)}
            />
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
            <Button loading={submitting}>{t('msg_btn_label_create_account')}</Button>
          </form>
        );
      }}
    />
  );
};

export default RegistrationPage;
