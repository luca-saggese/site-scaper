export const HIDE_REMOTE_DELAY = 2000;
export const TOAST_AUTO_CLOSE = 5000;

export const WIDTH = 1920;
export const HEIGHT = 1080;

export enum Links {
  Home = '/',
  Maintenance = '/maintenance',
  Screensharing = '/screensharing',
}

export enum EventType {
  UpdateScreen = 'UPDATE_SCREEN',
  DeleteScreen = 'DELETE_SCREEN',
  UpdateChannel = 'UPDATE_CHANNEL',
  UpdateShow = 'UPDATE_SHOW',
  ChangeView = 'CHANGE_VIEW',
  ChangeRotation = 'CHANGE_ROTATION',
  NewVersionRelease = 'NEW_VERSION_RELEASE',
  ReloadTvClient = 'RELOAD_TV_CLIENT',
  WebRtcStart = 'client-WEBRTC_START',
  WebRtcAccept = 'client-WEBRTC_ACCEPT',
  WebRtcEnd = 'client-WEBRTC_END',
}
