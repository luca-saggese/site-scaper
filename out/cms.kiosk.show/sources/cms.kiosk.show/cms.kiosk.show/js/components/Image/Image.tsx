import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { ReactComponent as ImagePlaceholder } from '@Images/icons/imagePlaceholder.svg';
import { noop } from '@Utils/helpers';

import styles from './Image.module.scss';

enum State {
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Error = 'ERROR',
}

export interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  title?: string;
  LoadingComponent?: React.ReactNode;
  onClick?: () => void;
}

const Image: React.FunctionComponent<ImageProps> = ({
  className,
  src,
  title,
  alt = '',
  LoadingComponent,
  onClick = noop,
}) => {
  const [state, setState] = useState(State.Loading);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const elem = ref.current;
    return () => {
      if (elem) {
        // If image is destroyed, cancel load
        elem.src = '';
      }
    };
  }, []);

  const onLoad = () => {
    setState(State.Loaded);
  };

  const onError = () => {
    setState(State.Error);
  };

  return (
    <>
      <img
        ref={ref}
        className={classnames(className, state !== State.Loaded && styles.hidden)}
        src={src}
        alt={alt}
        title={title}
        onLoad={onLoad}
        onError={onError}
        onClick={onClick}
      />
      {state === State.Loading && LoadingComponent}
      {state === State.Error && <ImagePlaceholder className={className} onClick={onClick} />}
    </>
  );
};

export default Image;
