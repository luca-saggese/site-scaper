export enum NodeEnvEnum {
  Development = 'development',
  Production = 'production',
}

const config = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvEnum) || NodeEnvEnum.Development,
  REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'REACT_APP_API_BASE_URL',
  REACT_APP_UNFURLER_URL: process.env.REACT_APP_UNFURLER_URL || '',
  REACT_APP_SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
  REACT_APP_SENTRY_RELEASE: process.env.REACT_APP_SENTRY_RELEASE,
  REACT_APP_PUSHER_AUTH_URL: process.env.REACT_APP_PUSHER_AUTH_URL || '',
  REACT_APP_PUSHER_CLUSTER: process.env.REACT_APP_PUSHER_CLUSTER || '',
  REACT_APP_PUSHER_APP_KEY: process.env.REACT_APP_PUSHER_APP_KEY || '',
};

export default config;
