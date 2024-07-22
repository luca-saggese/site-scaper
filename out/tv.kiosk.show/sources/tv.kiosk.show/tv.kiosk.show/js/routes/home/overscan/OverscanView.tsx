import React from 'react';

import Typography from '../../../components/Typography';

import styles from './OverscanView.module.scss';
import { useTranslation } from '../../../utils/i18n';

const OverscanView: React.FunctionComponent = () => {
  const t = useTranslation();

  return (
    <div className={styles.container}>
      <Typography className={styles.badge}>{t('msg_tv_overscan_badge')}</Typography>
      <Typography className={styles.infoText}>{t('msg_tv_overscan_message')}</Typography>
    </div>
  );
};

export default OverscanView;
