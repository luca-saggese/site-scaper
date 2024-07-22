import classnames from 'classnames';
import React from 'react';

import styles from './ContentBox.module.scss';

export enum ContextBoxStyle {
  Large = 'style-large',
  Medium = 'style-medium',
}

export interface ContentBoxProps {
  className?: string;
  boxStyle?: ContextBoxStyle;
}

const ContentBox: React.FunctionComponent<ContentBoxProps> = ({
  className,
  children,
  boxStyle = ContextBoxStyle.Medium,
}) => {
  return <div className={classnames(styles.contentBox, styles[boxStyle], className)}>{children}</div>;
};

export default ContentBox;
