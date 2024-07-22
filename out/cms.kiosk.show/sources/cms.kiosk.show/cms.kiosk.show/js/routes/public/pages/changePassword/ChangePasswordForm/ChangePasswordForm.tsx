import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';

import Button from '@Components/Button';
import FormError from '@Components/Form/FormError/FormError';
import FormField from '@Components/Form/FormField';
import TextInput, { TextInputProps } from '@Components/Form/TextInput';
import Typography from '@Components/Typography';
import { LocalStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { useChangePasswordMutation } from '@Graphql/graphqlTypes.generated';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import analytics from '@Utils/analytics';
import { composeValidators, password, required } from '@Utils/form';
import { callMutationForForm } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';
import { deleteFromLocalStorage } from '@Utils/localStorage';

import styles from './ChangePasswordForm.module.scss';

export interface ResetPasswordFormProps {
  passwordKey: string;
}

interface ChangePasswordFormValues {
  newPassword: string;
}

const ChangePasswordForm: React.FunctionComponent<ResetPasswordFormProps> = ({ passwordKey }) => {
  const t = useTranslation();
  const history = useHistory();
  const [changePasswordComplete, setChangePasswordComplete] = useState(false);

  const [resetPassword] = useChangePasswordMutation({
    onCompleted: () => {
      deleteFromLocalStorage(LocalStorage.UserToken);
      setChangePasswordComplete(true);
    },
  });

  const onSubmitHandler = (values: ChangePasswordFormValues) => {
    analytics.track('user_change_password', { event_location: 'public' });
    return callMutationForForm(
      resetPassword({
        variables: {
          input: {
            ...values,
            passwordKey,
          },
        },
      })
    );
  };

  const handleLoginButtonClick = () => {
    history.replace(RouteConfig.Login.buildLink());
  };

  return (
    <>
      {changePasswordComplete ? (
        <div className={styles.changePasswordSuccessContainer}>
          <Typography>{t('msg_label_change_password_success')}</Typography>
          <Button className={styles.button} onClick={handleLoginButtonClick}>
            {t('msg_label_login')}
          </Button>
        </div>
      ) : (
        <Form
          onSubmit={onSubmitHandler}
          render={({ handleSubmit, submitting, submitError, dirtySinceLastSubmit }) => {
            return (
              <form onSubmit={handleSubmit} className={sharedAuthStyles.form}>
                {submitError && !dirtySinceLastSubmit && <FormError>{t(submitError)}</FormError>}
                <FormField<TextInputProps<string>>
                  name="newPassword"
                  component={TextInput}
                  autoComplete="password"
                  type="password"
                  label={t('msg_field_label_change_password_password')}
                  validate={composeValidators(required(), password)}
                />
                <Button className={styles.button} loading={submitting}>
                  {t('msg_label_change_password_btn')}
                </Button>
              </form>
            );
          }}
        />
      )}
    </>
  );
};

export default ChangePasswordForm;
