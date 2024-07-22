import * as DateFns from 'date-fns';
import queryString from 'query-string';
import React, { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Loader from '@Components/Loader';
import { toastError } from '@Components/Toastify';
import { GoogleSocial, LocalStorage, SessionStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { useSocialAuthMutation } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { logError } from '@Utils/helpers';
import { setValueToLocalStorage } from '@Utils/localStorage';
import { deleteFromSessionStorage, getFromSessionStorage } from '@Utils/sessionStorage';
import { sendGoogleAnalyticsRequest } from '@Utils/tracking';

const GoogleOAuthPage: React.FunctionComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const handleError = useCallback(() => {
    toastError('msg_error_title_default_google_auth_error', 'msg_error_default_google_auth_error');
    history.replace(RouteConfig.Login.buildLink());
  }, [history]);

  // Get query params and remove # as it is not needed
  const params = queryString.parse(location.hash[0] === '#' ? location.hash.substring(1) : location.hash);
  const accessToken =
    !params.access_token || typeof params.access_token === 'string'
      ? params.access_token || ''
      : params.access_token.join('');

  if (!accessToken) {
    toastError('msg_error_title_default_google_auth_error', 'msg_error_default_google_auth_error');
    logError('google access token could not be found');
    handleError();
  }
  const [socialAuth] = useSocialAuthMutation();
  useEffect(() => {
    socialAuth({
      variables: {
        accessToken,
        provider: GoogleSocial.provider,
      },
    })
      .then(({ data }) => {
        if (!data?.socialAuth.token) {
          handleError();
        } else {
          const { token, social } = data.socialAuth;

          const actionProperties = { type: 'google', event_location: 'public' };

          const diffFromCurrentTime = DateFns.differenceInSeconds(new Date(), new Date(social?.user.dateJoined));
          if (diffFromCurrentTime <= 10) {
            analytics.cacheTrackEvent('user_create', actionProperties);
            const cid = getFromSessionStorage(SessionStorage.Cid);

            if (cid) {
              sendGoogleAnalyticsRequest({ cid, action: 'signup' });
              deleteFromSessionStorage(SessionStorage.Cid);
            }
          }
          analytics.cacheTrackEvent('user_login', actionProperties);

          setValueToLocalStorage(LocalStorage.UserToken, token);
        }
      })
      .catch((reason) => {
        logError(reason);
        toastError('msg_error_title_default_google_auth_error', 'msg_error_default_google_auth_error');
      });
  }, [accessToken, handleError, history, socialAuth]);

  return <Loader />;
};

export default GoogleOAuthPage;
