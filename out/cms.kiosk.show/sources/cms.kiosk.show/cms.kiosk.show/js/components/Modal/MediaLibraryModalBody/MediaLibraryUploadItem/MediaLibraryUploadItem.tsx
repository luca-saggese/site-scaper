import React from 'react';

import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import Typography from '@Components/Typography';
import { useTranslation } from '@Utils/i18n';

import styles from './MediaLibraryUploadItem.module.scss';

export interface MediaLibraryUploadItemProps {
  onClick: () => void;
}

const MediaLibraryUploadItem: React.FunctionComponent<MediaLibraryUploadItemProps> = ({ onClick }) => {
  const t = useTranslation();

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.content}>
        <Button
          className={styles.uploadFileButton}
          buttonStyle={ButtonStyle.Secondary}
          buttonColor={ButtonColor.Black}
          buttonType={ButtonType.Button}
        >
          {t('msg_label_upload_user_avatar_browse_files_button')}
        </Button>
        <Typography className={styles.dragAndDropText}>
          {t('msg_label_upload_user_avatar_drag_and_drop_message')}
        </Typography>
      </div>
    </div>
  );
};

export default MediaLibraryUploadItem;
