import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import styles from '@Routes/auth/pages/login/LoginPage.module.scss';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import AuthPageLayout from '@Routes/auth/shared/AuthLayout';
import LogoHeader from '@Routes/auth/shared/LogoHeader/LogoHeader';
import ResetPasswordForm from '@Routes/public/pages/resetPassword/ResetPasswordForm';
import { useTranslation } from '@Utils/i18n';

export interface ResetPasswordPageProps {}

const ResetPasswordPage: FunctionComponent<ResetPasswordPageProps> = () => {
  const t = useTranslation();
  return (
    <AuthPageLayout>
      <LogoHeader text={t('msg_label_reset_password')} />
      <ContentBox boxStyle={ContextBoxStyle.Large} className={sharedAuthStyles.content}>
        <div className={classnames(styles.loginContainer)}>
          <ResetPasswordForm />
        </div>
      </ContentBox>
    </AuthPageLayout>
  );
};

export default ResetPasswordPage;
