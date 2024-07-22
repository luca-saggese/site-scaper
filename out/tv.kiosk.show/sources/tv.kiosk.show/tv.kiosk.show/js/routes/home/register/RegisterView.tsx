import React, { useContext } from 'react';
import QRCode from 'qrcode.react';

import Typography from '../../../components/Typography';
import donutGif from '../../../../images/donut.gif';

import styles from './RegisterView.module.scss';
import { KioskContext } from '../../../contexts/kiosk/kioskContext';
import { APP_CONFIG } from '../../../utils/globalKiosk';
import { useTranslation } from '../../../utils/i18n';

const RegisterView: React.FunctionComponent = () => {
  const { device } = useContext(KioskContext);
  const t = useTranslation();

  return (
    <div className={styles.container}>
      <img src={donutGif} className={styles.donut} alt="Donut" />
      <Typography className={styles.badge}>{t('msg_tv_register_badge')}</Typography>
      <Typography className={styles.qrCodeInfoText}>{t('msg_tv_register_message')}</Typography>
      <div className={styles.codeContainer}>
        <QRCode
          className={styles.qrCode}
          value={`${APP_CONFIG.cmsUrl}add?registrationCode=${device?.registrationCode}`}
          includeMargin
          size={232}
        />
        <Typography className={styles.registrationCode}>{device?.registrationCode}</Typography>
      </div>
      <div className={styles.registrationCodeInfoTextContainer}>
        <Typography className={styles.registrationCodeInfoText}>{t('msg_tv_register_code_message')}</Typography>
        <Typography className={styles.registrationCodeInfoText}>{`${APP_CONFIG.cmsUrl}add`}</Typography>
      </div>
    </div>
  );
};

export default RegisterView;
