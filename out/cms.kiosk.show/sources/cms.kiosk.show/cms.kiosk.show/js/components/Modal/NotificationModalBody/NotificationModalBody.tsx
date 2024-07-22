import React from 'react';

import Icon, { IconStyle, IconType } from '@Components/Icon';
import { ModalProps } from '@Components/Modal';
import Typography from '@Components/Typography';

import styles from './NotificationModalBody.module.scss';

export interface NotificationModalData extends ModalProps {
  text: string;
}

const NotificationModalBody: React.FunctionComponent<NotificationModalData> = ({ text }) => {
  return (
    <div className={styles.container}>
      <Typography className={styles.text}>{text}</Typography>
      <Icon className={styles.icon} icon={IconType.Loading} iconStyle={IconStyle.Secondary} spin={true} />
    </div>
  );
};

export default NotificationModalBody;
