import classnames from 'classnames';
import React from 'react';

import styles from './Placeholder.module.scss';

export enum PlaceholderType {
  Rectangle = 'type-Rectangle',
  Circle = 'type-Circle',
}
export enum PlaceholderColor {
  DarkPaleBlue = 'color-darkPaleBlue',
  DustyDarkBlue = 'color-dustyDarkBlue',
  LightGrey = 'color-lightGrey',
  VeryLightGrey = 'color-veryLightGrey',
}

interface PlaceholderProps {
  className?: string;
  color?: PlaceholderColor;
  type?: PlaceholderType;
  animate?: boolean;
}

const Placeholder: React.FunctionComponent<PlaceholderProps> = ({
  className,
  color = PlaceholderColor.DarkPaleBlue,
  type = PlaceholderType.Rectangle,
  children,
  animate = true,
}) => {
  return (
    <div
      className={classnames(className, styles.container, styles[color], styles[type], { [styles.animate]: animate })}
    >
      {children}
    </div>
  );
};

export default Placeholder;
