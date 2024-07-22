import React from 'react';

import styles from './ModalContainer.module.scss';

const ModalContainer: React.FunctionComponent = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>{children}</div>
    </div>
  );
};

export default ModalContainer;
