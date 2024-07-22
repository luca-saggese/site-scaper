import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '@Components/ErrorBoundary';
import Grid from '@Components/Layout/Grid';
import { logError, noop } from '@Utils/helpers';

import styles from './MainPageLayout.module.scss';

export interface MainPageLayoutProps {
  FooterComponent?: React.ReactNode;
  NavigationBarComponent: React.ReactNode;
  gridClassName?: string;
  limitBodyWidth?: boolean;
}

const MainPageLayout: React.FunctionComponent<MainPageLayoutProps> = ({
  children,
  FooterComponent,
  NavigationBarComponent,
  gridClassName,
  limitBodyWidth = true,
}) => {
  useEffect(() => {
    if (!limitBodyWidth) {
      return noop();
    }

    document.body.classList.add(styles.bodyMinWidth);
    return () => {
      document.body.classList.remove(styles.bodyMinWidth);
    };
  }, [limitBodyWidth]);

  return (
    <div className={styles.container}>
      {NavigationBarComponent}
      <Grid className={gridClassName}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={logError}>
          {children}
        </ErrorBoundary>
      </Grid>
      {FooterComponent}
    </div>
  );
};

export default MainPageLayout;
