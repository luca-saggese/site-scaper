import { APP_CONFIG, kiosk, Store } from './globalKiosk';

const store = (() => {
  if (APP_CONFIG.isElectron) {
    return kiosk.store;
  }

  return {
    set: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key, defaultValue) => {
      const data = localStorage.getItem(key);
      if (data === undefined || data === 'undefined') return defaultValue;
      if (data === null) return null;
      return JSON.parse(data);
    },
    delete: (key) => {
      localStorage.removeItem(key);
    },
  } as Store;
})();

export default store;
