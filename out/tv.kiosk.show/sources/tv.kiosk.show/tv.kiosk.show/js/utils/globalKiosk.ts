export interface Logger {
  error: (msg: string) => void;
  warn: (msg: string) => void;
  info: (msg: string) => void;
  debug: (msg: string) => void;
}

export interface Store {
  set: (key: string, value: any) => void;
  get: (key: string, defaultValue?: any) => any;
  delete: (key: string) => void;
}
declare global {
  interface Document {
    kiosk: {
      appVersion: string;
      osInfo: string;
      machineId: string;
      logger: Logger;
      autoUpdater: EventTarget;
      store: Store;
      ipcRenderer: any;
    };
  }
}

export const kiosk = document.kiosk;

const isElectron = !!kiosk;

const appVersion = isElectron ? kiosk.appVersion : undefined;
const osInfo = isElectron ? kiosk.osInfo : undefined;
const machineId = isElectron ? kiosk.machineId : undefined;

export const APP_CONFIG = {
  isElectron,
  appVersion,
  tvAppVersion: process.env.REACT_APP_VERSION,
  osInfo,
  machineId,
  sentryDsn: process.env.REACT_APP_SENTRY_DSN,
  sentryRelease: process.env.REACT_APP_SENTRY_RELEASE,
  apiGraphqlUrl: process.env.REACT_APP_API_GRAPHQL_URL || '',
  cmsUrl: process.env.REACT_APP_CMS_URL || '',
  pusherAppKey: process.env.REACT_APP_PUSHER_APP_KEY || '',
  pusherCluster: process.env.REACT_APP_PUSHER_CLUSTER || '',
  pusherAuthUrl: process.env.REACT_APP_PUSHER_AUTH_URL || '',
} as const;
