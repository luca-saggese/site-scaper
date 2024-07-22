import { RouteConfig } from '@Config/routes';
import { RouteInfo } from '@Routes/AppRoutes';
import GoogleOAuthPage from '@Routes/auth/pages/googleOAuth';
import LoginPage from '@Routes/auth/pages/login';
import RegistrationPage from '@Routes/auth/pages/registration';
import RegistrationEmailPage from '@Routes/auth/pages/registrationEmail';

const AuthRoutes: RouteInfo[] = [
  {
    path: RouteConfig.Login.template,
    component: LoginPage,
    title: 'msg_page_title_login',
  },
  {
    path: RouteConfig.Register.template,
    component: RegistrationPage,
    title: 'msg_page_title_register',
  },
  {
    path: RouteConfig.RegisterWithEmail.template,
    component: RegistrationEmailPage,
    title: 'msg_page_title_register_with_email',
  },
  {
    path: RouteConfig.OAuthGoogle.template,
    component: GoogleOAuthPage,
    title: 'msg_page_google_oauth',
  },
];

export default AuthRoutes;
