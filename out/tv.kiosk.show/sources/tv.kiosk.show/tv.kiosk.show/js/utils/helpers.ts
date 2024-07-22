import { AvailableDeviceTypes } from '../graphql/graphqlTypes.generated';
import { APP_CONFIG } from './globalKiosk';

export const noop = () => {};

export function getDeviceType() {
  if (APP_CONFIG.isElectron) {
    return AvailableDeviceTypes.Electron;
  } else if (navigator.userAgent.includes('CrKey')) {
    return AvailableDeviceTypes.Chromecast;
  } else if (navigator.userAgent.includes('Kiosk Android')) {
    return AvailableDeviceTypes.Android;
  } else if (/AFT.*Build/i.test(navigator.userAgent)) {
    return AvailableDeviceTypes.Firetv;
  } else {
    return AvailableDeviceTypes.Browser;
  }
}
