import queryString from 'query-string';
import { useCallback, useEffect, useRef } from 'react';

import { KIOSK_SOURCE } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { useAppConfigQuery } from '@Graphql/graphqlTypes.generated';

interface useDropboxAuthProps {
  onAccessTokenReceived: (accessToken: string) => void;
}

const useDropboxAuth = ({ onAccessTokenReceived }: useDropboxAuthProps) => {
  const { data } = useAppConfigQuery();
  const onAccessTokenReceivedRef = useRef(onAccessTokenReceived);

  const dropboxClientId = data?.appConfig.dropboxClientId;

  const onMessageReceived = useCallback((event: MessageEvent) => {
    if (!event.data || event.data.source !== KIOSK_SOURCE) {
      return;
    }

    window.removeEventListener('message', onMessageReceived);

    const accessToken = event.data.access_token;
    if (!accessToken) {
      return;
    }

    onAccessTokenReceivedRef.current(accessToken);
  }, []);

  // Cleanup event listeners if any left
  useEffect(() => {
    return () => {
      window.removeEventListener('message', onMessageReceived);
    };
  }, [onMessageReceived]);

  const openDropboxAuthWindow = () => {
    const queryParams = queryString.stringify({
      redirect_uri: `${window.location.origin}${RouteConfig.OAuthDropbox.buildLink()}`,
      response_type: 'token',
      client_id: dropboxClientId,
    });

    window.open(`https://www.dropbox.com/oauth2/authorize?${queryParams}`, 'Dropbox auth', 'width=800,height=800');

    window.addEventListener('message', onMessageReceived, false);
  };

  return { openDropboxAuthWindow };
};

export default useDropboxAuth;
