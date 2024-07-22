import React, { useEffect } from 'react';

import Loader from '@Components/Loader/Loader';
import { LocalStorage, SessionStorage } from '@Config/constants';
import { useMeQuery, useRefreshTokenMutation } from '@Graphql/graphqlTypes.generated';
import { useAuth } from '@Hooks/useAuth';
import analytics from '@Utils/analytics';
import { getJWTStatus, getTokenState, TokenState } from '@Utils/auth';
import { deleteFromLocalStorage, setValueToLocalStorage } from '@Utils/localStorage';
import { deleteFromSessionStorage, getFromSessionStorage, setValueToSessionStorage } from '@Utils/sessionStorage';
import { sendGoogleAnalyticsRequest } from '@Utils/tracking';

const initialURLSearchParams = new URLSearchParams(window.location.search);

const storeUrlParamToSessionStorage = (paramName: SessionStorage) => {
  const value = initialURLSearchParams.get(paramName);
  if (value) {
    setValueToSessionStorage(paramName, value);
  }
};
const AppHandler: React.FunctionComponent = ({ children }) => {
  const [refresh] = useRefreshTokenMutation({
    onCompleted: ({ refreshToken }) => {
      setValueToLocalStorage(LocalStorage.UserToken, refreshToken.token);
    },
  });

  const { isLoggedIn, token } = useAuth();

  const meQuery = useMeQuery({ fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true, skip: !isLoggedIn });

  useEffect(() => {
    storeUrlParamToSessionStorage(SessionStorage.UtmSource);
    storeUrlParamToSessionStorage(SessionStorage.UtmMedium);
    storeUrlParamToSessionStorage(SessionStorage.UtmCampaign);
    storeUrlParamToSessionStorage(SessionStorage.UtmTerm);
    storeUrlParamToSessionStorage(SessionStorage.UtmContent);
    storeUrlParamToSessionStorage(SessionStorage.Cid);
  }, []);

  useEffect(() => {
    const tokenStatus = getJWTStatus(token);
    const tokenState = getTokenState(tokenStatus);

    if (!token || tokenState === TokenState.Invalid) {
      deleteFromLocalStorage(LocalStorage.UserToken);
      return;
    }

    if (tokenState === TokenState.Expired) {
      refresh({ variables: { token } }).catch(() => {
        deleteFromLocalStorage(LocalStorage.UserToken);
      });
    }
  }, [refresh, token]);

  useEffect(() => {
    if (meQuery.loading || !meQuery.data) {
      return;
    }

    const cid = getFromSessionStorage(SessionStorage.Cid);

    if (cid) {
      sendGoogleAnalyticsRequest({ cid, action: 'login' });
      deleteFromSessionStorage(SessionStorage.Cid);
    }
  }, [meQuery.data, meQuery.loading]);

  useEffect(() => {
    if (meQuery.loading) {
      return;
    }
    const activeOrgId = meQuery.data?.me.info.activeOrganization?.organization.id;
    if (activeOrgId) {
      setValueToSessionStorage(SessionStorage.OrganizationId, activeOrgId);
      analytics.sendCachedEvents();
    } else {
      deleteFromSessionStorage(SessionStorage.OrganizationId);
    }
  }, [meQuery.data, meQuery.loading]);

  if (meQuery.loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AppHandler;
