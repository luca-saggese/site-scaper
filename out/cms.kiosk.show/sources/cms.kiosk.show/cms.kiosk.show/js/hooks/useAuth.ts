import { useEffect, useState } from 'react';

import { LocalStorage } from '@Config/constants';
import { getJWTStatus, getTokenState, TokenState } from '@Utils/auth';
import { getFromLocalStorage, localStorageEventEmitter } from '@Utils/localStorage';

export const useAuth = () => {
  const [token, setToken] = useState(getFromLocalStorage(LocalStorage.UserToken));

  useEffect(() => {
    function listener() {
      setToken(getFromLocalStorage(LocalStorage.UserToken));
    }

    // Track changes by user
    window.addEventListener('storage', listener);
    // Track changes by application
    localStorageEventEmitter.addListener('change', listener);

    return () => {
      window.removeEventListener('storage', listener);
      localStorageEventEmitter.removeListener('change', listener);
    };
  }, [token]);

  const tokenStatus = getJWTStatus(token);
  const tokenState = getTokenState(tokenStatus);

  const isLoggedIn = tokenState === TokenState.Valid;

  return { isLoggedIn, token };
};
