import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import Button, { ButtonColor, ButtonStyle } from '@Components/Button';
import Typography, { TextType } from '@Components/Typography';
import { MessageKey, useTranslation } from '@Utils/i18n';

import styles from './ImageUpload.module.scss';

export interface ImageUploadProps extends DropzoneOptions {
  error?: MessageKey;
  className?: string;
  dragOverClassName?: string;
}

const ImageUpload: FunctionComponent<ImageUploadProps> = ({ error, className, dragOverClassName, ...rest }) => {
  const t = useTranslation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone(rest);

  return (
    <div
      {...getRootProps()}
      className={classnames(
        styles.container,
        className,
        isDragActive && styles.dragHover,
        isDragActive && dragOverClassName
      )}
    >
      <input {...getInputProps()} />
      {!isDragActive ? (
        <div className={styles.content}>
          <Button
            className={styles.uploadFileButton}
            buttonStyle={ButtonStyle.Secondary}
            buttonColor={ButtonColor.Black}
          >
            {t('msg_label_upload_user_avatar_browse_files_button')}
          </Button>
          <Typography className={classnames(styles.dragAndDropText, error && styles.error)}>
            {t(error || 'msg_label_upload_user_avatar_drag_and_drop_message')}
          </Typography>
        </div>
      ) : (
        <div className={styles.dragOverContent}>
          <Typography className={styles.dragAndDropTitle} styleType={TextType.UpperCaseLink} WrapperElement="div">
            {t('msg_label_upload_user_avatar_drag_over_title')}
          </Typography>
          <Typography className={styles.dragAndDropText} WrapperElement="div">
            {t('msg_label_upload_user_avatar_drag_over_drag_and_drop_message')}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
