import 'core-js';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import React from 'react';
import { render } from 'react-dom';

import App from '@Components/App';
import config from '@Config/config';

import 'react-toastify/dist/ReactToastify.min.css';
import './styles/index.scss';
import '@Utils/i18n';

if (config.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: config.REACT_APP_SENTRY_DSN,
    release: config.REACT_APP_SENTRY_RELEASE,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.2,
  });
}

render(<App />, document.getElementById('root'));
