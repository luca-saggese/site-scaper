import { RouteConfig } from '@Config/routes';
import NotPermittedPage from '@Routes/error/pages/notpermitted';

import { RouteInfo } from '../AppRoutes';

const ErrorRoutes: RouteInfo[] = [
  {
    path: RouteConfig.ErrorNotPermitted.template,
    component: NotPermittedPage,
    title: 'msg_page_title_error_not_permitted',
  },
];

export default ErrorRoutes;
