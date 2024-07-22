import React from 'react';
import { Form } from 'react-final-form';

import Button from '@Components/Button';
import FormError from '@Components/Form/FormError/FormError';
import FormField from '@Components/Form/FormField';
import PasswordInput from '@Components/Form/PasswordInput';
import TextInput, { TextInputProps } from '@Components/Form/TextInput';
import { LocalStorage } from '@Config/constants';
import { useAuthMutation } from '@Graphql/graphqlTypes.generated';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import analytics from '@Utils/analytics';
import { composeValidators, email, required } from '@Utils/form';
import { callMutationForForm } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';
import { setValueToLocalStorage } from '@Utils/localStorage';

export interface LoginFormProps {}

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FunctionComponent<LoginFormProps> = () => {
  const t = useTranslation();
  const [login] = useAuthMutation({
    onCompleted: ({ tokenAuth }) => {
      const { token } = tokenAuth;
      analytics.cacheTrackEvent('user_login', { type: 'email', event_location: 'public' });
      setValueToLocalStorage(LocalStorage.UserToken, token);
    },
  });

  const onSubmitHandler = (values: LoginFormValues) => {
    return callMutationForForm(login({ variables: values }));
  };

  return (
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
              label={t('msg_field_label_email')}
              showErrorAfterSubmitFailed
              validate={composeValidators(required(), email)}
            />
            <FormField
              name="password"
              component={PasswordInput}
              type="password"
              autoComplete="current-password"
              label={t('msg_field_label_password')}
              showErrorAfterSubmitFailed
              validate={required()}
            />
            <Button loading={submitting}>{t('msg_label_login')}</Button>
          </form>
        );
      }}
    />
  );
};

export default LoginPage;
