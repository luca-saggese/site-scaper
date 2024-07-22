import { useEffect, useState } from 'react';

export const useDebounce = <T = any>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const changeValueHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(changeValueHandler);
    };
  }, [delay, value]);
  return debouncedValue;
};
