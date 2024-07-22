import React from 'react';

import { ModalProps } from '@Components/Modal';
import { useTranslation } from '@Utils/i18n';

import styles from './ScreenSharingInfoModal.module.scss';

const ScreenSharingInfoModal: React.FunctionComponent<ModalProps> = () => {
  const t = useTranslation();

  return (
    <div className={styles.container}>
      <h3>{t('msg_screenshare_modal_title')}</h3>
      <p>{t('msg_screenshare_modal_p_1')}</p>
      <p>{t('msg_screenshare_modal_p_2')}</p>
      <ul>
        <li>{t('msg_screenshare_modal_li_1')}</li>
        <li>{t('msg_screenshare_modal_li_2')}</li>
        <li>{t('msg_screenshare_modal_li_3')}</li>
        <li>{t('msg_screenshare_modal_li_4')}</li>
      </ul>
    </div>
  );
};

export default ScreenSharingInfoModal;
