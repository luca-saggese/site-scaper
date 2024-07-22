import classnames from 'classnames';
import React from 'react';

import Image from '@Components/Image';
import kioskLogo from '@Images/kiosk-logo.gif';
import { isFunction, noop } from '@Utils/helpers';

import styles from './Logo.module.scss';

export interface LogoProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Logo: React.FunctionComponent<LogoProps> = ({ className, onClick, disabled = false }) => {
  const clickEnabled = !disabled && onClick && isFunction(onClick);

  return (
    <Image
      src={kioskLogo}
      className={classnames(className, styles.logo, clickEnabled && styles.clickable)}
      onClick={(clickEnabled && onClick) || noop}
    />
  );
};

export default Logo;
