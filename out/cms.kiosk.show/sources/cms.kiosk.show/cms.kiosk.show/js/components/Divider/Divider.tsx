import classnames from 'classnames';
import React from 'react';

import styles from './Divider.module.scss';

interface DividerProps {
  className?: string;
}

const Divider: React.FunctionComponent<DividerProps> = ({ className }) => {
  return <hr className={classnames(styles.container, className)} />;
};

export default Divider;
