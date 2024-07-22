import { LocalStorage } from '@Config/constants';

import { getFromLocalStorage, setValueToLocalStorage } from './localStorage';
import { randomAlphaNumeric } from './random';

export function getCmsToken() {
  if (!getFromLocalStorage(LocalStorage.CmsToken)) {
    setValueToLocalStorage(LocalStorage.CmsToken, randomAlphaNumeric(40));
  }
  return getFromLocalStorage(LocalStorage.CmsToken);
}
