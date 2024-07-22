import { useParams } from 'react-router-dom';

import { RouteConfig, RouteConfigMeme } from '@Config/routes';
import { EmptyObject } from '@Utils/types';

export function useRouteParams<
  T extends typeof RouteConfig[keyof typeof RouteConfig] | typeof RouteConfigMeme[keyof typeof RouteConfigMeme]
>(routeConfig: T) {
  type UrlParams = Parameters<typeof routeConfig['buildLink']>[0];
  return useParams<UrlParams extends Record<string, string> ? UrlParams : EmptyObject>();
}
