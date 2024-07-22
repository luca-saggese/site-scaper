import React from 'react';
import { Redirect } from 'react-router-dom';

import { RouteConfig } from '@Config/routes';
import { useAuth } from '@Hooks/useAuth';

export function withNoAuthentication(Component: React.ComponentType) {
  return function WithNoAuthenticationHoc() {
    const { isLoggedIn } = useAuth();

    return !isLoggedIn ? <Component /> : <Redirect to={RouteConfig.Home.buildLink()} />;
  };
}
