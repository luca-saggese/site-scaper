import { useEffect, useState } from 'react';

export const useValueShouldUpdate = <T = any>(value: T, shouldUpdate: boolean) => {
  const [previousValue, setPreviousValue] = useState(value);
  useEffect(() => {
    if (shouldUpdate) {
      setPreviousValue(value);
    }
  }, [shouldUpdate, value]);
  return previousValue;
};
