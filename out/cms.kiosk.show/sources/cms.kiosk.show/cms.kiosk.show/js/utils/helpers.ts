import * as Sentry from '@sentry/react';
import isURL from 'validator/es/lib/isURL';

import { Maybe, ScreenRotation } from '@Graphql/graphqlTypes.generated';

export const noop = () => {};
export const EmptyComponent = () => null;
export const isFunction = (value: any) => typeof value === 'function';
export const logError = (value?: string | Error) => {
  if (!value) {
    return;
  }

  if (typeof value === 'string') {
    Sentry.captureMessage(value, Sentry.Severity.Error);
  } else {
    Sentry.captureException(value);
  }
  // eslint-disable-next-line no-console
  console.error(value);
};
// eslint-disable-next-line no-console
export const logInfo = (...values: any[]) => console.info(...values);

export const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return (!!url.hostname && isURL(url.hostname)) || url.hostname === 'localhost';
  } catch (e) {
    return false;
  }
};

export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== undefined && value !== null;
};

export const formatTime = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60) % 60;
  const seconds = duration % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

export const parseTime = (time = '') => {
  const normalizedTime = time.replace(new RegExp(':', 'gi'), '').padStart(6, '0');

  const seconds = Number(normalizedTime.substr(4, 2)) || 0;
  const minutes = Number(normalizedTime.substr(2, 2)) || 0;
  const hours = Number(normalizedTime.substr(0, 2)) || 0;

  return seconds + minutes * 60 + hours * 3600;
};

export const times = (count: number) => Array.from(Array(count).keys());

export const getNextScreenRotationValue = (currentRotation: ScreenRotation) => {
  switch (currentRotation) {
    case ScreenRotation.Rotation_0:
      return ScreenRotation.Rotation_90;
    case ScreenRotation.Rotation_90:
      return ScreenRotation.Rotation_180;
    case ScreenRotation.Rotation_180:
      return ScreenRotation.Rotation_270;
    case ScreenRotation.Rotation_270:
      return ScreenRotation.Rotation_0;
    default:
      return ScreenRotation.Rotation_0;
  }
};

export const getNodes = <T>(edges?: Array<Maybe<{ node?: Maybe<T> }>>): T[] => {
  return edges?.map((edge) => edge?.node).filter(isDefined) || [];
};

export const gqlIdToUuid = (gqlId: string): string => {
  const result = atob(gqlId).split(':').pop();
  if (!result) {
    throw Error('The provided id was not a graphql id');
  }
  return result;
};

export const groupBy = <T>(items: T[], property: keyof T) => {
  return items.reduce<Record<string, T[]>>((acc, cur) => {
    const groupKey = String(cur[property]);
    if (groupKey in acc) {
      acc[groupKey].push(cur);
    } else {
      acc[groupKey] = [cur];
    }
    return acc;
  }, {});
};
