import { RouteConfig } from '@Config/routes';
import ShowEditorPage from '@Routes/show/pages/editor/ShowEditorPage';
import ShowForkPage from '@Routes/show/pages/fork/ShowForkPage';
import ShowOverviewPage from '@Routes/show/pages/overview';
import ShowPreviewPage from '@Routes/show/pages/showPreview';

import { RouteInfo } from '../AppRoutes';

const ShowRoutes: RouteInfo[] = [
  {
    path: RouteConfig.Shows.template,
    component: ShowOverviewPage,
    title: 'msg_page_title_show',
  },
  {
    path: RouteConfig.PublicShowFork.template,
    component: ShowForkPage,
    title: 'msg_page_title_show_edit',
  },
  {
    path: RouteConfig.ShowEditor.template,
    component: ShowEditorPage,
    title: 'msg_page_title_show_edit',
  },
  {
    path: RouteConfig.ChannelShowEditor.template,
    component: ShowEditorPage,
    title: 'msg_page_title_show_edit',
  },
  {
    path: RouteConfig.ShowPreview.template,
    component: ShowPreviewPage,
    title: 'msg_page_title_show_edit',
  },
];

export default ShowRoutes;
