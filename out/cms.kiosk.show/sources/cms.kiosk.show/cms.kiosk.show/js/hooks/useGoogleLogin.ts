import queryString from 'query-string';
import { useCallback } from 'react';

import { toastError } from '@Components/Toastify';
import { GoogleSocial } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { useAppConfigQuery } from '@Graphql/graphqlTypes.generated';
import { logError } from '@Utils/helpers';

const useGoogleLogin = () => {
  const { data } = useAppConfigQuery();

  const clientId = data?.appConfig.googleClientId;

  const signIn = useCallback(
    (e?: Event) => {
      // Prevent button submit
      if (e) {
        e.preventDefault();
      }

      if (!clientId) {
        logError('No google clientId was provided');
        toastError('msg_error_title_default_google_auth_error', 'msg_error_default_google_auth_error');
        return;
      }

      const redirectUri = `${window.location.origin}${RouteConfig.OAuthGoogle.buildLink()}`;

      const googleQueryParams = queryString.stringify({
        redirect_uri: redirectUri,
        response_type: GoogleSocial.responseType,
        scope: GoogleSocial.scope,
        client_id: clientId,
      });
      // redirect to google oauth2
      window.location.assign(`${GoogleSocial.authUrl}?${googleQueryParams}`);
    },
    [clientId]
  );

  return { signIn: clientId ? signIn : undefined };
};

export default useGoogleLogin;
