import { EventEmitter } from 'events';

import { LocalStorage } from '@Config/constants';

export const localStorageEventEmitter = new EventEmitter();

export function setValueToLocalStorage(key: LocalStorage, value: any) {
  localStorage.setItem(key, value);
  setTimeout(() => {
    localStorageEventEmitter.emit('change');
  });
}

export function deleteFromLocalStorage(key: LocalStorage) {
  localStorage.removeItem(key);
  setTimeout(() => {
    localStorageEventEmitter.emit('change');
  });
}

export function getFromLocalStorage(key: LocalStorage) {
  return localStorage.getItem(key) || null;
}
