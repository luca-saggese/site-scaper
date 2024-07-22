import { RouteConfig } from '@Config/routes';
import ScreenOverviewPage from '@Routes/screen/pages/overview';
import ScreenPreviewPage from '@Routes/screen/pages/screenPreview';
import ScreenSharingPage from '@Routes/screen/pages/screenSharing/ScreenSharing';

import { RouteInfo } from '../AppRoutes';

const ScreenRoutes: RouteInfo[] = [
  {
    path: RouteConfig.Screens.template,
    component: ScreenOverviewPage,
    title: 'msg_page_title_screen',
  },
  {
    path: RouteConfig.ScreenPreview.template,
    component: ScreenPreviewPage,
    title: 'msg_page_title_screen',
  },
  {
    path: RouteConfig.ScreenAdd.template,
    component: ScreenOverviewPage,
    title: 'msg_page_title_screen',
  },
  {
    path: RouteConfig.ScreenSharing.template,
    component: ScreenSharingPage,
    title: 'msg_page_title_screen',
  },
];

export default ScreenRoutes;
