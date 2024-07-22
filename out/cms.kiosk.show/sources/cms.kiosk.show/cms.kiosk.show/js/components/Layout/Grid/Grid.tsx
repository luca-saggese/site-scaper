import classnames from 'classnames';
import React from 'react';

import styles from './Grid.module.scss';

export interface GridProps {
  className?: string;
}

const Grid: React.FunctionComponent<GridProps> = ({ className, children }) => {
  return <main className={classnames(styles.grid, className)}>{children}</main>;
};

export default Grid;
