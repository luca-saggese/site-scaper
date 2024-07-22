import React from 'react';

import Icon, { IconType } from '@Components/Icon';
import Image from '@Components/Image';
import Typography from '@Components/Typography';
import { useTranslation } from '@Utils/i18n';

import styles from './MediaLibraryUploadingItem.module.scss';

export interface MediaLibraryUploadingItemProps {
  src: string;
}

const MediaLibraryUploadingItem: React.FunctionComponent<MediaLibraryUploadingItemProps> = ({ src }) => {
  const t = useTranslation();

  return (
    <div className={styles.container}>
      <Image className={styles.preview} src={src} />
      <div className={styles.overlay}>
        <div className={styles.backdrop} />
        <div className={styles.content}>
          <Icon icon={IconType.Loading} spin={true} />
          <Typography>{t('msg_label_uploading_message')}</Typography>
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryUploadingItem;
