import React from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '@Components/Loader';
import { toastError } from '@Components/Toastify';
import { LocalStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  MeDocument,
  useUserJoinOrganizationMutation,
  useVerifyInvitationKeyQuery,
} from '@Graphql/graphqlTypes.generated';
import { useAuth } from '@Hooks/useAuth';
import { useRouteParams } from '@Hooks/useRouteParams';
import { deleteFromLocalStorage, setValueToLocalStorage } from '@Utils/localStorage';

const InvitePage: React.FunctionComponent = () => {
  const { invitationKey } = useRouteParams(RouteConfig.InvitePage);
  const history = useHistory();
  const { isLoggedIn } = useAuth();

  const [userJoinOrganizationMutation] = useUserJoinOrganizationMutation({
    onCompleted: () => {
      deleteFromLocalStorage(LocalStorage.InvitationKey);
      history.push(RouteConfig.Home.buildLink());
    },
    refetchQueries: [{ query: MeDocument }],
    onError: () => {
      deleteFromLocalStorage(LocalStorage.InvitationKey);
      toastError('msg_error_title_join_organization', 'msg_error_join_organization');
    },
  });

  useVerifyInvitationKeyQuery({
    variables: {
      invitationKey,
    },
    onCompleted: () => {
      if (!isLoggedIn) {
        setValueToLocalStorage(LocalStorage.InvitationKey, invitationKey);
        history.push(RouteConfig.Register.buildLink());
        return;
      }

      userJoinOrganizationMutation({ variables: { input: { invitationKey } } });
    },
    onError: () => {
      deleteFromLocalStorage(LocalStorage.InvitationKey);
      toastError('msg_error_title_verify_invitation_key', 'msg_error_verify_invitation_key');
      history.push(isLoggedIn ? RouteConfig.Home.buildLink() : RouteConfig.Login.buildLink());
    },
  });

  return <Loader />;
};

export default InvitePage;
