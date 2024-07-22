import React from 'react';
import { useTranslation } from 'react-i18next';

import Icon, { IconStyle, IconType } from '@Components/Icon';
import Image from '@Components/Image';
import Typography, { TextColor, TextType } from '@Components/Typography';

import { ModalProps } from '../Modal';
import ModalContainer from '../ModalContainer';

import hint from './chromecast-hint.png';
import styles from './ChromecastHelperModal.module.scss';

const ChromecastHelperModal: React.FunctionComponent<ModalProps> = ({ closeModal }) => {
  const { t } = useTranslation();

  return (
    <ModalContainer>
      <div className={styles.topContainer}>
        <Typography styleType={TextType.MediumHeadline} WrapperElement="div">
          {t('msg_chromecast_modal_title')}
        </Typography>
        <Icon
          icon={IconType.Close}
          iconStyle={IconStyle.None}
          className={styles.closeIcon}
          onClick={() => closeModal()}
        />
      </div>
      <div className={styles.content}>
        <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
          {t('msg_chromecast_modal_paragraph')}
        </Typography>
        <Image src={hint} className={styles.screenshotImage} />
      </div>
    </ModalContainer>
  );
};

export default ChromecastHelperModal;
