import React from 'react';

import Typography from '../../../components/Typography';

import styles from './ScreenBlockedView.module.scss';
import { useTranslation } from '../../../utils/i18n';

const ScreenBlockedView: React.FunctionComponent = () => {
  const t = useTranslation();

  return (
    <div className={styles.container}>
      <Typography className={styles.badge}>{t('msg_tv_screen_blocked_badge')}</Typography>
      <Typography className={styles.infoText}>{t('msg_tv_screen_blocked_message')}</Typography>
    </div>
  );
};

export default ScreenBlockedView;
