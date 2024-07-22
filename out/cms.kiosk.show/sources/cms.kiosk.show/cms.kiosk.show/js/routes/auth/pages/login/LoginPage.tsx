import classnames from 'classnames';
import React from 'react';

import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import Link from '@Components/Link';
import SocialButton, { SocialButtonType } from '@Components/SocialButton/SocialButton';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import useGoogleLogin from '@Hooks/useGoogleLogin';
import LoginForm from '@Routes/auth/pages/login/LoginForm';
import RedirectInfoMessage from '@Routes/auth/pages/login/RedirectInfoMessage';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import AuthPageLayout from '@Routes/auth/shared/AuthLayout/AuthPageLayout';
import InviteInfoMessage from '@Routes/auth/shared/InviteInfoMessage';
import LogoHeader from '@Routes/auth/shared/LogoHeader/LogoHeader';
import { useTranslation } from '@Utils/i18n';

import styles from './LoginPage.module.scss';

const LoginPage: React.FunctionComponent = () => {
  const { signIn } = useGoogleLogin();
  const t = useTranslation();

  return (
    <AuthPageLayout
      FooterComponent={
        <Link to={RouteConfig.Register.buildLink()}>
          <Typography styleType={TextType.LowerCaseLink}>{t('msg_label_no_account')}</Typography>
        </Link>
      }
    >
      <LogoHeader text={t('msg_label_login_start')} />
      <ContentBox boxStyle={ContextBoxStyle.Large} className={sharedAuthStyles.content}>
        <div className={classnames(styles.loginContainer)}>
          <InviteInfoMessage />
          <RedirectInfoMessage />
          <LoginForm />
          <Typography styleType={TextType.Body} className={classnames(styles.typography)}>
            {t('msg_label_or_alternative')}
          </Typography>
          <SocialButton socialType={SocialButtonType.Google} onClick={signIn} disabled={!signIn}>
            {t('msg_label_login_google')}
          </SocialButton>
        </div>
      </ContentBox>
    </AuthPageLayout>
  );
};

export default LoginPage;
