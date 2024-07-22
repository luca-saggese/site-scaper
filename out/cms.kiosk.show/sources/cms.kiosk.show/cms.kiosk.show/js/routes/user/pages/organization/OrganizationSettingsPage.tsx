import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { toastError } from '@Components/Toastify';
import { RouteConfig } from '@Config/routes';
import { useMeQuery } from '@Graphql/graphqlTypes.generated';
import GeneralTabView from '@Routes/user/pages/organization/GeneralTabView';
import IntegrationsTabView from '@Routes/user/pages/organization/IntegrationsTabView';
import UsersTabView from '@Routes/user/pages/organization/UsersTabView';
import SettingsLayout from '@Routes/user/pages/shared/SettingsLayout';

const OrganizationSettingsPage: React.FunctionComponent = () => {
  const { data, loading, error, refetch } = useMeQuery();

  if (error) {
    toastError('msg_error_title_loading_user_settings', 'msg_error_loading_user_settings');
  }

  if (loading || !data?.me) {
    return <SettingsLayout>{null}</SettingsLayout>;
  }

  const currentUser = data.me.info;
  const { activeOrganization } = currentUser;

  if (!activeOrganization) {
    return <Redirect to={RouteConfig.SetupOrganization.buildLink()} />;
  }

  return (
    <SettingsLayout>
      <Switch>
        <Route path={RouteConfig.OrganizationSettingsGeneral.template} exact>
          <GeneralTabView activeOrganization={activeOrganization} />
        </Route>
        <Route path={RouteConfig.OrganizationSettingsUsers.template} exact>
          <UsersTabView activeOrganization={activeOrganization} currentUser={currentUser} refetch={refetch} />
        </Route>
        <Route path={RouteConfig.OrganizationSettingsIntegrations.template} exact>
          <IntegrationsTabView activeOrganization={activeOrganization} refetch={refetch} />
        </Route>
        <Route path={RouteConfig.OrganizationSettings.template}>
          <Redirect to={RouteConfig.OrganizationSettingsGeneral.buildLink()} />
        </Route>
      </Switch>
    </SettingsLayout>
  );
};

export default OrganizationSettingsPage;
