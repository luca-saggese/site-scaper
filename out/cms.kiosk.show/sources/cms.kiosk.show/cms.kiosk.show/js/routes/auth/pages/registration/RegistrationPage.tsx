import classnames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@Components/Button';
import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import SocialButton, { SocialButtonType } from '@Components/SocialButton/SocialButton';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import useGoogleLogin from '@Hooks/useGoogleLogin';
import AuthPageLayout from '@Routes/auth/shared/AuthLayout/AuthPageLayout';
import InviteInfoMessage from '@Routes/auth/shared/InviteInfoMessage';
import LogoHeader from '@Routes/auth/shared/LogoHeader/LogoHeader';
import { useTranslation } from '@Utils/i18n';

import styles from './RegistrationPage.module.scss';

export interface RegistrationPageProps {}

const RegistrationPage: React.FunctionComponent<RegistrationPageProps> = () => {
  const { signIn } = useGoogleLogin();
  const t = useTranslation();
  const history = useHistory();
  const onSignInClickHandler = () => history.push(RouteConfig.Login.buildLink());
  const onRegisterWithEmailClickHandler = () => history.push(RouteConfig.RegisterWithEmail.buildLink());

  return (
    <AuthPageLayout>
      <LogoHeader text={t('msg_label_registration_create_account')} />
      <ContentBox boxStyle={ContextBoxStyle.Large} className={styles.registrationMainContainer}>
        <div className={classnames(styles.registrationContainer)}>
          <InviteInfoMessage />
          <SocialButton socialType={SocialButtonType.Email} onClick={onRegisterWithEmailClickHandler}>
            {t('msg_label_register_with_email')}
          </SocialButton>
          <SocialButton socialType={SocialButtonType.Google} onClick={signIn} disabled={!signIn}>
            {t('msg_label_register_with_google')}
          </SocialButton>
        </div>
        <div className={classnames(styles.signInContainer)}>
          <Typography styleType={TextType.Body}>{t('msg_label_already_signed_up')}</Typography>
          <Button onClick={onSignInClickHandler}>{t('msg_label_sign_in')}</Button>
        </div>
      </ContentBox>
    </AuthPageLayout>
  );
};

export default RegistrationPage;
