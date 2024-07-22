import decode from 'jwt-decode';

import { REFRESH_BEFORE_EXPIRE } from '@Config/constants';

export interface JWT {
  email: string;
  exp: number;
  origIat: number;
}

export interface JWTStatus {
  expired: boolean;
  expiringSoon: boolean;
}

export enum TokenState {
  Valid,
  Invalid,
  // Can be refreshed
  Expired,
}

export const isExpired = (exp: number) => {
  return exp * 1000 < Date.now();
};

export const decodeJWT = (token: string | null): JWT | null => {
  return token !== null ? decode(token) : null;
};

const parseJWTStatus = (exp: number) => {
  const timeToExpire = exp * 1000 - Date.now();
  return {
    expired: isExpired(exp),
    expiringSoon: timeToExpire <= REFRESH_BEFORE_EXPIRE,
  };
};

export const getJWTStatus = (token: string | null): JWTStatus | null => {
  const decodedJWT = token && decodeJWT(token);
  if (!decodedJWT) {
    return null;
  }
  return parseJWTStatus(decodedJWT.exp);
};

export const getTokenState = (jwtStatus: JWTStatus | null): TokenState => {
  if (!jwtStatus || jwtStatus.expired) {
    return TokenState.Invalid;
  }
  if (jwtStatus.expiringSoon) {
    return TokenState.Expired;
  }
  return TokenState.Valid;
};
