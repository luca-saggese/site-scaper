import classnames from 'classnames';
import React, { ReactNode } from 'react';

import styles from './Typography.module.scss';

interface TextProps<WP = any> {
  WrapperElement?: React.ComponentType<WP> | string;
  wrapperProps?: WP;
  styleType?: TextType;
  className?: string;
  id?: string;
  children?: ReactNode;
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
}

function Typography({
  WrapperElement = 'span',
  wrapperProps,
  styleType = TextType.Body,
  children,
  className,
  id,
}: TextProps) {
  return (
    <WrapperElement id={id} className={classnames(styles.typography, styles[styleType], className)} {...wrapperProps}>
      {children}
    </WrapperElement>
  );
}

export default Typography;
