import classnames from 'classnames';
import React from 'react';

import styles from './Typography.module.scss';

interface TextProps<WP = any> {
  WrapperElement?: React.ComponentType<WP> | string;
  title?: string;
  styleType?: TextType;
  color?: TextColor;
  className?: string;
  id?: string;
  onClick?: () => void;
  htmlFor?: string;
}

export enum TextColor {
  White = 'color-white',
  Black = 'color-black',
  Red = 'color-red',
  Blue = 'color-blue',
  LightFadedBlue = 'color-lightFadedBlue',
  LightGrey = 'color-lightGrey',
  DarkGrey = 'color-darkGrey',
}

export enum TextType {
  XLBoldHeadline = 'xlBoldHeadline',
  LargeBoldHeadline = 'largeBoldHeadline',
  MediumHeadline = 'mediumHeadline',
  RegularHeadline = 'regularHeadline',
  TinyHeadline = 'tinyHeadline',
  Body = 'body',
  LowerCaseLink = 'lowerCaseLink',
  UpperCaseLink = 'upperCaseLink',
  TinyLink = 'tinyLink',
  SmallBody = 'smallBody',

  MobileHeadline = 'mobileHeadline',
  MobileBody = 'mobileBody',
  MobileLink = 'mobileLink',
}

const Typography: React.FunctionComponent<TextProps> = ({
  WrapperElement = 'span',
  styleType = TextType.Body,
  color,
  children,
  className,
  id,
  ...rest
}) => {
  return (
    <WrapperElement
      id={id}
      className={classnames(styles.typography, styles[styleType], color && styles[color], className)}
      {...rest}
    >
      {children}
    </WrapperElement>
  );
};

export default Typography;
