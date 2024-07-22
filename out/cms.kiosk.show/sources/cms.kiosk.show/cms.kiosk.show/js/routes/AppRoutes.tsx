import React from 'react';

import AuthRoutes from '@Routes/auth';
import ChannelRoutes from '@Routes/channel/ChannelRoutes';
import ErrorRoutes from '@Routes/error/ErrorRoutes';
import PublicRoutes from '@Routes/public/PublicRoutes';
import ScreenRoutes from '@Routes/screen/ScreenRoutes';
import SetupRoutes from '@Routes/setup/SetupRoutes';
import ShowRoutes from '@Routes/show/ShowRoutes';
import UserRoutes from '@Routes/user/UserRoutes';
import { MessageKey } from '@Utils/i18n';

export type RouteInfo = {
  path: string;
  exact?: boolean;
  component: React.ComponentType;
  title: MessageKey;
};

export const publicRoutes: RouteInfo[] = PublicRoutes;

export const privateRoutes: RouteInfo[] = [
  ...ScreenRoutes,
  ...ShowRoutes,
  ...ChannelRoutes,
  ...SetupRoutes,
  ...UserRoutes,
  ...ErrorRoutes,
];

// User can access only if is not authenticated
export const notAuthenticated: RouteInfo[] = [...AuthRoutes];
