import classnames from 'classnames';
import React from 'react';

import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import Link from '@Components/Link';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import RegistrationForm from '@Routes/auth/pages/registrationEmail/RegistrationForm';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import AuthPageLayout from '@Routes/auth/shared/AuthLayout/AuthPageLayout';
import InviteInfoMessage from '@Routes/auth/shared/InviteInfoMessage';
import LogoHeader from '@Routes/auth/shared/LogoHeader/LogoHeader';
import { useTranslation } from '@Utils/i18n';

export interface RegistrationEmailPageProps {}

const RegistrationEmailPage: React.FunctionComponent<RegistrationEmailPageProps> = () => {
  const t = useTranslation();

  return (
    <AuthPageLayout
      FooterComponent={
        <Link to={RouteConfig.Login.buildLink()}>
          <Typography styleType={TextType.LowerCaseLink}>{t('msg_label_got_account')}</Typography>
        </Link>
      }
    >
      <LogoHeader text={t('msg_label_registration_create_account')} />
      <ContentBox boxStyle={ContextBoxStyle.Large} className={classnames(sharedAuthStyles.content)}>
        <InviteInfoMessage />
        <RegistrationForm />
      </ContentBox>
    </AuthPageLayout>
  );
};

export default RegistrationEmailPage;
