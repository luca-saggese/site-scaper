import classnames from 'classnames';
import React from 'react';

import styles from './FormError.module.scss';

export interface ContentBoxProps {
  className?: string;
}

const FormError: React.FunctionComponent<ContentBoxProps> = ({ className, children }) => {
  return <div className={classnames(styles.errorBox, className)}>{children}</div>;
};

export default FormError;
