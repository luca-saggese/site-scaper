import React from 'react';

import Icon, { IconStyle, IconType } from '@Components/Icon';

import styles from './NavigationBarClose.module.scss';

export interface NavigationBarCloseProps {
  onClose: () => void;
  title: string;
}

const NavigationBarClose: React.FunctionComponent<NavigationBarCloseProps> = ({ onClose, title }) => {
  return (
    <div className={styles.container} title={title}>
      <Icon
        className={styles.closeIcon}
        iconStyle={IconStyle.None}
        icon={IconType.Close}
        onClick={onClose}
        title="Exit page"
      />
    </div>
  );
};

export default NavigationBarClose;
