import React from 'react';
import * as Sentry from '@sentry/react';

interface RootProps {
  children: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
  return <>{children}</>;
};

export default Sentry.withProfiler(Root);
