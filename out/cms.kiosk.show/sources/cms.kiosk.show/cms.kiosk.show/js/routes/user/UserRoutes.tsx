import { RouteConfig } from '@Config/routes';
import OrganizationSettingsPage from '@Routes/user/pages/organization';
import UserSettingsPage from '@Routes/user/pages/settings';

import { RouteInfo } from '../AppRoutes';

const UserRoutes: RouteInfo[] = [
  {
    path: RouteConfig.UserSettings.template,
    component: UserSettingsPage,
    title: 'msg_page_title_user_settings',
  },
  {
    path: RouteConfig.OrganizationSettings.template,
    component: OrganizationSettingsPage,
    title: 'msg_page_title_organization_settings',
    exact: false,
  },
];

export default UserRoutes;
