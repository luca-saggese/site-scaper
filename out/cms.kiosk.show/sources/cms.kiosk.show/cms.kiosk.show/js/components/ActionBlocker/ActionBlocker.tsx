import React from 'react';

import { globalEvents } from '@Utils/globalEvents';

import styles from './ActionBlocker.module.scss';

export const ActionBlocker: React.FunctionComponent<{ message?: string }> = ({ message }) => {
  return (
    <div
      className={styles.actionBlocker}
      onClick={() => {
        globalEvents.emit('actionBlocked');
      }}
    >
      {message && (
        <div className={styles.messageWrapper}>
          <div className={styles.actionBlockerMessage}>{message}</div>
        </div>
      )}
    </div>
  );
};
