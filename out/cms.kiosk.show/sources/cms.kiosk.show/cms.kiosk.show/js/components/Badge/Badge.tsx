import classnames from 'classnames';
import React from 'react';

import styles from './Badge.module.scss';

export enum BadgeColor {
  Red = 'color-red',
  Purple = 'color-purple',
  FadedBlue = 'color-faded-blue',
  Blue = 'color-blue',
}

interface BadgeProps {
  color?: BadgeColor;
  className?: string;
  title?: string;
}

const Badge: React.FunctionComponent<BadgeProps> = ({ children, color = BadgeColor.Red, className, title }) => {
  return (
    <div className={classnames(styles.container, styles[color], className)} title={title}>
      {children}
    </div>
  );
};

export default Badge;
