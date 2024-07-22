import { withAuthentication } from '@Hocs/withAuthentication';
import { withNoAuthentication } from '@Hocs/withNoAuthentication';

import { notAuthenticated, privateRoutes, publicRoutes, RouteInfo } from './AppRoutes';

const routes = [
  ...publicRoutes,
  ...privateRoutes.map(
    (item): RouteInfo => ({
      ...item,
      component: withAuthentication(item.component),
    })
  ),
  ...notAuthenticated.map(
    (item): RouteInfo => ({
      ...item,
      component: withNoAuthentication(item.component),
    })
  ),
];

export default routes;
