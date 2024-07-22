import { SessionStorage } from '@Config/constants';

export function setValueToSessionStorage(key: SessionStorage, value: any) {
  sessionStorage.setItem(key, value);
}

export function deleteFromSessionStorage(key: SessionStorage) {
  return sessionStorage.removeItem(key);
}

export function getFromSessionStorage(key: SessionStorage) {
  return sessionStorage.getItem(key) || null;
}
