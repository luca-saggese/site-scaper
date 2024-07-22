import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@Components/Button';
import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import Typography, { TextType } from '@Components/Typography';
import { LocalStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { useMeQuery, useVerifyUserEmailMutation } from '@Graphql/graphqlTypes.generated';
import { useAuth } from '@Hooks/useAuth';
import { useRouteParams } from '@Hooks/useRouteParams';
import sharedAuthStyles from '@Routes/auth/shared/Auth.module.scss';
import AuthPageLayout from '@Routes/auth/shared/AuthLayout';
import LogoHeader from '@Routes/auth/shared/LogoHeader/LogoHeader';
import { mutationErrorHandler } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';
import { deleteFromLocalStorage } from '@Utils/localStorage';

import styles from './VerifyEmailPage.module.scss';

const VerifyEmailPage: React.FunctionComponent = () => {
  const history = useHistory();
  const params = useRouteParams(RouteConfig.VerifyEmail);
  const t = useTranslation();

  const { isLoggedIn } = useAuth();
  const meQuery = useMeQuery({ skip: !isLoggedIn });

  const user = meQuery.data?.me;

  const [verifyUserEmailMutation, { data, loading, error }] = useVerifyUserEmailMutation({
    onError: mutationErrorHandler('msg_error_title_verify_email'),
  });

  useEffect(() => {
    verifyUserEmailMutation({
      variables: {
        input: {
          activationKey: params.code,
        },
      },
    });
  }, [params.code, verifyUserEmailMutation]);

  useEffect(() => {
    if (data && user) {
      if (data.verifyUserEmail.activationKey?.user.id !== user.info.id) {
        deleteFromLocalStorage(LocalStorage.UserToken);
      }
    }
  }, [data, meQuery.data?.me.info.id, user]);

  return (
    <AuthPageLayout>
      <LogoHeader />
      <ContentBox boxStyle={ContextBoxStyle.Large} className={sharedAuthStyles.content}>
        <Typography styleType={TextType.Body} className={styles.typography}>
          {loading && t('msg_label_verify_email_in_progress')}
          {data && t('msg_label_verify_email_success')}
          {error && t('msg_error_verify_email')}
        </Typography>
        {!loading && (
          <div className={styles.controls}>
            {user ? (
              <Button
                onClick={() => {
                  history.push(RouteConfig.Home.buildLink());
                }}
              >
                {t('msg_label_continue_to_kiosk')}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  history.push(RouteConfig.Login.buildLink());
                }}
              >
                {t('msg_label_sign_in')}
              </Button>
            )}
          </div>
        )}
      </ContentBox>
    </AuthPageLayout>
  );
};

export default VerifyEmailPage;
