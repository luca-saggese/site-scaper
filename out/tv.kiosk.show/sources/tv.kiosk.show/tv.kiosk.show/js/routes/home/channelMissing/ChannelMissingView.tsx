import React from 'react';

import Typography from '../../../components/Typography';

import styles from './ChannelMissingView.module.scss';
import { useTranslation } from '../../../utils/i18n';

const ChannelMissingView: React.FunctionComponent = () => {
  const t = useTranslation();

  return (
    <div className={styles.container}>
      <Typography className={styles.badge}>{t('msg_tv_channel_missing_badge')}</Typography>
      <Typography className={styles.infoText}>{t('msg_tv_channel_missing_message')}</Typography>
    </div>
  );
};

export default ChannelMissingView;
