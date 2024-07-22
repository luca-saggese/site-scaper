import React, { useEffect } from 'react';
import { matchPath, Redirect, useLocation } from 'react-router-dom';

import { LocalStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  MeDocument,
  MeFragment,
  useChangeActiveOrganizationMutation,
  useMeQuery,
} from '@Graphql/graphqlTypes.generated';
import { useAuth } from '@Hooks/useAuth';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNodes } from '@Utils/helpers';
import { deleteFromLocalStorage, getFromLocalStorage, setValueToLocalStorage } from '@Utils/localStorage';

interface NoActiveOrganizationProps {
  user: MeFragment;
}

const NoActiveOrganization: React.FunctionComponent<NoActiveOrganizationProps> = ({ user }) => {
  const [changeActiveOrganization] = useChangeActiveOrganizationMutation({
    refetchQueries: [{ query: MeDocument }],
    onError: mutationErrorHandler('msg_error_changing_active_organization'),
  });

  const organizations = getNodes(user.organizations.edges);
  const firstOrgId = organizations[0]?.id;

  useEffect(() => {
    if (!firstOrgId) {
      return;
    }
    changeActiveOrganization({ variables: { input: { orgXGroup: firstOrgId } } });
  }, [changeActiveOrganization, firstOrgId]);

  return null;
};

export function withAuthentication(Component: React.ComponentType) {
  return function WithAuthenticationHoc() {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const redirectUrlNotAuthenticated = RouteConfig.Login.buildLink();
    const meQuery = useMeQuery({ skip: !isLoggedIn });
    const user = meQuery.data?.me;
    const invitationKey = getFromLocalStorage(LocalStorage.InvitationKey);
    const targetLocation = getFromLocalStorage(LocalStorage.TargetLocation);

    useEffect(() => {
      if (!isLoggedIn) {
        setValueToLocalStorage(LocalStorage.TargetLocation, location.pathname + location.search);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoggedIn) {
      return <Redirect to={redirectUrlNotAuthenticated} />;
    }

    if (invitationKey) {
      return <Redirect to={RouteConfig.InvitePage.buildLink({ invitationKey })} />;
    }

    if (!user) {
      return null;
    }

    if (!user.organizations.edges.length) {
      return matchPath(location.pathname, RouteConfig.SetupOrganization.template) ? (
        <Component />
      ) : (
        <Redirect to={RouteConfig.SetupOrganization.buildLink()} />
      );
    }

    if (user.info.acceptTermsAndConditions === null) {
      return matchPath(location.pathname, RouteConfig.TermsAndConditions.template) ? (
        <Component />
      ) : (
        <Redirect to={RouteConfig.TermsAndConditions.buildLink()} />
      );
    }

    if (!user.info.activeOrganization) {
      return <NoActiveOrganization user={user} />;
    }

    if (targetLocation) {
      deleteFromLocalStorage(LocalStorage.TargetLocation);
      return <Redirect to={targetLocation} />;
    }

    return <Component />;
  };
}
