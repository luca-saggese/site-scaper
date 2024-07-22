import classnames from 'classnames';
import React from 'react';

import styles from './Icon.module.scss';
import { noop } from '../../utils/helpers';
import { ReactComponent as CloseIcon } from '../../../images/icons/close.svg';
import { ReactComponent as LoadingIcon } from '../../../images/icons/loading.svg';

interface IconProps {
  icon: IconType;
  className?: string;
  onClick?: () => void;
}

export enum IconType {
  Close = 'close',
  Loading = 'loading',
}

const Icon = ({ icon, className, onClick = noop }: IconProps) => {
  if (icon === IconType.Loading) {
    return <LoadingIcon className={classnames(styles.icon, styles.spin, className)} />;
  }

  if (icon === IconType.Close) {
    return <CloseIcon onClick={onClick} className={classnames(styles.icon, className)} />;
  }

  return null;
};

export default Icon;
