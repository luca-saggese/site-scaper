import classnames from 'classnames';
import React from 'react';

import Image from '@Components/Image';
import loadingEye from '@Images/loading-eye.gif';

import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  iconClassName?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ className, iconClassName }) => {
  return (
    <div className={classnames(styles.loader, className)}>
      <Image className={classnames(styles.image, iconClassName)} src={loadingEye} />
    </div>
  );
};

export default Loader;
