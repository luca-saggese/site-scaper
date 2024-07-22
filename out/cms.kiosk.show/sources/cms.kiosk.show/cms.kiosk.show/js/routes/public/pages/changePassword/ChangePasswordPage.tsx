import classnames from 'classnames';
import React, { FunctionComponent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import Loader from '@Components/Loader';
import { RouteConfig } from '@Config/routes';
import { useVerifyPasswordResetMutation } from '@Graphql/graphqlTypes.generated';
import { useRouteParams } from '@Hooks/useRouteParams';
import styles from '@Routes/auth/pages/login/LoginPage.module.scss';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import AuthPageLayout from '@Routes/auth/shared/AuthLayout';
import LogoHeader from '@Routes/auth/shared/LogoHeader/LogoHeader';
import ChangePasswordForm from '@Routes/public/pages/changePassword/ChangePasswordForm';
import { useTranslation } from '@Utils/i18n';

export interface ChangePasswordPageProps {}

const ChangePasswordPage: FunctionComponent<ChangePasswordPageProps> = () => {
  const { passwordKey } = useRouteParams(RouteConfig.ChangePassword);
  const history = useHistory();
  const t = useTranslation();

  const [verifyPasswordResetMutation, { data, loading }] = useVerifyPasswordResetMutation({
    variables: {
      input: {
        passwordKey,
      },
    },
    onError: () => history.replace(RouteConfig.Login.buildLink()),
  });

  useEffect(() => {
    verifyPasswordResetMutation();
  }, [verifyPasswordResetMutation]);

  if (!data || loading) {
    return <Loader />;
  }
  return (
    <AuthPageLayout>
      <LogoHeader text={t('msg_label_reset_password')} />
      <ContentBox boxStyle={ContextBoxStyle.Large} className={sharedAuthStyles.content}>
        <div className={classnames(styles.loginContainer)}>
          <ChangePasswordForm passwordKey={passwordKey} />
        </div>
      </ContentBox>
    </AuthPageLayout>
  );
};

export default ChangePasswordPage;
