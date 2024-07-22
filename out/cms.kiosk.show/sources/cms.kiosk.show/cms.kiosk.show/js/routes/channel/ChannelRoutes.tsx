import { RouteConfig } from '@Config/routes';
import ChannelPreviewPage from '@Routes/channel/pages/channelPreview';
import ChannelEditPage from '@Routes/channel/pages/edit';
import ChannelForkPage from '@Routes/channel/pages/fork';
import ChannelOverviewPage from '@Routes/channel/pages/overview';

import { RouteInfo } from '../AppRoutes';

const ChannelRoutes: RouteInfo[] = [
  {
    path: RouteConfig.Channels.template,
    component: ChannelOverviewPage,
    title: 'msg_page_title_channel',
  },
  {
    path: RouteConfig.ChannelEdit.template,
    component: ChannelEditPage,
    title: 'msg_page_title_channel_edit',
  },
  {
    path: RouteConfig.ChannelPreview.template,
    component: ChannelPreviewPage,
    title: 'msg_page_title_channel_edit',
  },
  {
    path: RouteConfig.PublicChannelFork.template,
    component: ChannelForkPage,
    title: 'msg_page_title_channel_edit',
  },
];

export default ChannelRoutes;
