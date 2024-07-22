import { APP_CONFIG, kiosk, Logger } from './globalKiosk';
import * as Sentry from '@sentry/react';

const logger: Logger = APP_CONFIG.isElectron ? kiosk.logger : console;

const appendPrefix = (msg: string | Error) => `React App: ${msg}`;

const reactLogger = {
  error: (msg: string | Error) => {
    if (typeof msg === 'string') {
      Sentry.captureMessage(msg, Sentry.Severity.Error);
    } else {
      Sentry.captureException(msg);
    }

    logger.error(appendPrefix(msg));
  },
  info: (msg: string) => logger.info(appendPrefix(msg)),
  warn: (msg: string) => logger.warn(appendPrefix(msg)),
  debug: (msg: string) => logger.warn(appendPrefix(msg)),
};

export default reactLogger;
