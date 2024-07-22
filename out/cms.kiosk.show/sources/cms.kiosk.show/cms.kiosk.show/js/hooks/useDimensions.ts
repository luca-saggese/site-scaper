import { useEffect, useState } from 'react';

import { noop } from '@Utils/helpers';

const getSize = (el: HTMLElement | null) => {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }

  const boundingRect = el.getBoundingClientRect();
  return {
    width: boundingRect.width,
    height: boundingRect.height,
  };
};

const useDimensions = (ref: React.MutableRefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>(getSize(ref && ref.current));

  useEffect(() => {
    if (!ref) {
      return noop;
    }

    const measure = () =>
      window.requestAnimationFrame(() => {
        setDimensions(getSize(ref && ref.current));
      });
    measure();

    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('resize', measure);
    };
  }, [ref]);

  return dimensions;
};

export default useDimensions;
