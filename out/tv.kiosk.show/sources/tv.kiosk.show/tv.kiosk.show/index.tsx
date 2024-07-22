// This must be the first line in src/index.tsx
import 'core-js';
import 'core-js/features/array/flat-map';
import 'regenerator-runtime/runtime';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import graphqlClient from './js/utils/graphqlClient';
import { ApolloProvider } from '@apollo/client';
import './styles/index.css';
import logger from './js/utils/logger';
import { APP_CONFIG } from './js/utils/globalKiosk';
import { KioskProvider } from './js/contexts/kiosk/kioskContext';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './js/routes/home/HomePage';
import MaintenancePage from './js/routes/maintenance';
import { Links } from './js/config/constants';
import './js/utils/i18n';
import Root from './root';
import ScreenSharingPage from './js/routes/screensharing/ScreenSharingPage';
import history from './js/utils/history';

logger.info('Starting...');
logger.info(`App config - ${JSON.stringify(APP_CONFIG)}`);

if (APP_CONFIG.sentryDsn) {
  Sentry.init({
    dsn: APP_CONFIG.sentryDsn,
    release: APP_CONFIG.sentryRelease,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.2,
  });
}

window.addEventListener('beforeunload', () => {
  logger.info('Quiting...');
});

ReactDOM.render(
  <ApolloProvider client={graphqlClient}>
    <Suspense fallback={<div>Loading... </div>}>
      <Root>
        <Router history={history}>
          <KioskProvider>
            <Switch>
              <Route path={Links.Home} exact={true}>
                <HomePage />
              </Route>
              <Route path={Links.Maintenance} exact={true}>
                <MaintenancePage />
              </Route>
              <Route path={Links.Screensharing} exact={true}>
                <ScreenSharingPage />
              </Route>
              <Route path="*">
                <Redirect to={Links.Home} />
              </Route>
            </Switch>
          </KioskProvider>
        </Router>
      </Root>
    </Suspense>
  </ApolloProvider>,
  document.getElementById('root')
);
