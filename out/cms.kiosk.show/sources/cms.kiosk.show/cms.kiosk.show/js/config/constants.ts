export const KIOSK_SOURCE = 'kiosk';

export enum SessionStorage {
  Cid = 'cid',
  UtmSource = 'utm_source',
  UtmMedium = 'utm_medium',
  UtmCampaign = 'utm_campaign',
  UtmTerm = 'utm_term',
  UtmContent = 'utm_content',
  OrganizationId = 'OrganizationId',
}

export enum LocalStorage {
  UserToken = 'UserToken',
  InvitationKey = 'InvitationKey',
  TargetLocation = 'TargetLocation',
  CmsToken = 'CmsToken',
}

export enum GoogleSocial {
  authUrl = 'https://accounts.google.com/o/oauth2/v2/auth',
  responseType = 'token',
  scope = 'email profile',
  provider = 'google-oauth2',
}

export const REFRESH_BEFORE_EXPIRE = 3600000;

export const DEFAULT_PAGE_SIZE = 20;

export const MAX_VISIBLE_SHOWS = 3;

export const DEFAULT_DELAY_MS = 500;

export const TOAST_AUTO_CLOSE = 5000;

export const TITLE_MAX_LENGTH = 30;

export const MAX_IMAGE_SIZE_BYTES = 5242880;

export const SLIDE_TEMPLATE_WIDTH = 1920;

export const SLIDE_TEMPLATE_HEIGHT = 1080;

export const ALLOWED_IMAGE_FILE_TYPES = ['image/jpeg', 'image/gif', 'image/png'];

export const GIPHY_PAGE_LIMIT = 16;

export const UNSPLASH_PAGE_LIMIT = 50;

export const MINIMUM_SHOW_DURATION = 5;

export enum AspectRatio {
  RATIO_16_9 = 0.5625, // 9/16
}

export enum EventType {
  WebRtcStart = 'client-WEBRTC_START',
  WebRtcAccept = 'client-WEBRTC_ACCEPT',
  WebRtcEnd = 'client-WEBRTC_END',
}

export const CANVAS_TEMPLATE_ID = 'canvas';
