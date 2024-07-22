import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryParamProvider } from 'use-query-params';

import Analytics from '@Components/Analytics';
import AppHandler from '@Components/AppHandler';
import DocumentTitle from '@Components/DocumentTitle';
import ErrorBoundaryFallback from '@Components/ErrorBoundary';
import { ModalProvider } from '@Components/Modal';
import { toastifyErrorConfig, toastifyInfoConfig } from '@Components/Toastify';
import { RouteConfig, RouteConfigMeme } from '@Config/routes';
import routes from '@Routes/index';
import { MemeGeneratorEditPageContainer } from '@Routes/public/pages/memeGenerator';
import { MemeGeneratorCreatePage } from '@Routes/public/pages/memeGenerator/MemeGeneratorCreatePage';
import { MemeGeneratorForkPage } from '@Routes/public/pages/memeGenerator/MemeGeneratorForkPage';
import graphqlClient from '@Utils/graphqlClient';
import { logError } from '@Utils/helpers';
import { history } from '@Utils/history';

const isMemesUrl = window.location.origin === 'https://meme.kiosk.show';

const App: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <Suspense fallback={<div>Loading... </div>}>
        <Router history={history}>
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={logError}>
            <AppHandler>
              <QueryParamProvider ReactRouterRoute={Route}>
                <ModalProvider>
                  <Analytics />
                  <ToastContainer {...toastifyErrorConfig} />
                  <ToastContainer {...toastifyInfoConfig} />
                  {isMemesUrl ? (
                    <DocumentTitle title={'msg_page_title_meme_generator'}>
                      <Switch>
                        <Route path={RouteConfigMeme.MemeGenerator.template} exact>
                          <MemeGeneratorCreatePage />
                        </Route>
                        <Route path={RouteConfigMeme.MemeGeneratorEdit.template} exact>
                          <MemeGeneratorEditPageContainer />
                        </Route>
                        <Route path={RouteConfigMeme.MemeGeneratorFork.template} exact>
                          <MemeGeneratorForkPage />
                        </Route>
                        <Redirect to={RouteConfigMeme.MemeGenerator.buildLink()} />
                      </Switch>
                    </DocumentTitle>
                  ) : (
                    <Switch>
                      {routes.map((route) => (
                        <Route path={route.path} exact={'exact' in route ? route.exact : true} key={route.path}>
                          <DocumentTitle title={route.title}>
                            <route.component />
                          </DocumentTitle>
                        </Route>
                      ))}
                      <Redirect to={RouteConfig.Home.buildLink()} />
                    </Switch>
                  )}
                </ModalProvider>
              </QueryParamProvider>
            </AppHandler>
          </ErrorBoundary>
        </Router>
      </Suspense>
    </ApolloProvider>
  );
};
export default Sentry.withProfiler(App);
