import { RouteConfig } from '@Config/routes';
import ChangePasswordPage from '@Routes/public/pages/changePassword';
import DropboxOAuthPage from '@Routes/public/pages/dropboxOAuth';
import InvitePage from '@Routes/public/pages/invite';
import MaintenancePage from '@Routes/public/pages/maintenance';
import PublicChannelPage from '@Routes/public/pages/publicChannel';
import PublicShowPage from '@Routes/public/pages/publicShow';
import ResetPasswordPage from '@Routes/public/pages/resetPassword';
import VerifyEmailPage from '@Routes/public/pages/verifyEmail';

import { RouteInfo } from '../AppRoutes';

const PublicRoutes: RouteInfo[] = [
  {
    path: RouteConfig.VerifyEmail.template,
    component: VerifyEmailPage,
    title: 'msg_page_verify_email',
  },
  {
    path: RouteConfig.InvitePage.template,
    component: InvitePage,
    title: 'msg_page_invite',
  },
  {
    path: RouteConfig.ResetPassword.template,
    component: ResetPasswordPage,
    title: 'msg_page_title_reset_password',
  },
  {
    path: RouteConfig.ChangePassword.template,
    component: ChangePasswordPage,
    title: 'msg_page_title_change_password',
  },
  {
    path: RouteConfig.OAuthDropbox.template,
    component: DropboxOAuthPage,
    title: 'msg_page_dropbox_oauth',
  },
  {
    path: RouteConfig.Maintenance.template,
    component: MaintenancePage,
    title: 'msg_page_title_maintenance',
  },
  {
    path: RouteConfig.PublicShow.template,
    component: PublicShowPage,
    title: 'msg_page_title_public_show',
  },
  {
    path: RouteConfig.PublicChannel.template,
    component: PublicChannelPage,
    title: 'msg_page_title_public_channel',
  },
];

export default PublicRoutes;
