import React from 'react';

import Icon, { IconStyle, IconType } from '@Components/Icon';
import Image from '@Components/Image';
import { ModalProps } from '@Components/Modal';
import ModalContainer from '@Components/Modal/ModalContainer';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { useTranslation } from '@Utils/i18n';

import GoogleDriveScreenshotImage from './google_drive_hint.gif';
import styles from './GoogleDriveInfoModalBody.module.scss';

const GoogleDriveInfoModalBody: React.FunctionComponent<ModalProps> = ({ closeModal }) => {
  const t = useTranslation();

  return (
    <ModalContainer>
      <div className={styles.topContainer}>
        <Typography styleType={TextType.MediumHeadline} WrapperElement="div">
          {t('msg_google_drive_info_modal_title')}
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
          {t('msg_google_drive_info_modal_instruction_1')}
        </Typography>
        <Image src={GoogleDriveScreenshotImage} className={styles.screenshotImage} />
        <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
          {t('msg_google_drive_info_modal_instruction_2')}
        </Typography>
      </div>
    </ModalContainer>
  );
};

export default GoogleDriveInfoModalBody;