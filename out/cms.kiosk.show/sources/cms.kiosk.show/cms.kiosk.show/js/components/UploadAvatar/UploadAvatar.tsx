import * as BlobUtils from 'blob-util';
import classNames from 'classnames';
import Slider from 'rc-slider';
import React, { FunctionComponent, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FileRejection } from 'react-dropzone';

import Button, { ButtonColor, ButtonStyle } from '@Components/Button';
import ImageUpload from '@Components/Form/ImageUpload';
import Icon, { IconSize, IconStyle, IconType } from '@Components/Icon';
import Typography, { TextType } from '@Components/Typography';
import { ALLOWED_IMAGE_FILE_TYPES, MAX_IMAGE_SIZE_BYTES } from '@Config/constants';
import { MessageKey, useTranslation } from '@Utils/i18n';

import 'rc-slider/assets/index.css';

import styles from './UploadAvatar.module.scss';

export interface UploadAvatarProps<T = any> {
  onAvatarSave: (blob: Blob) => Promise<T>;
  onCancel: () => void;
  saveInProgress: boolean;
}

const UploadAvatar: FunctionComponent<UploadAvatarProps> = ({ saveInProgress, onAvatarSave, onCancel }) => {
  const t = useTranslation();
  const [src, setSrc] = useState<string | undefined>();
  const [scale, setScale] = useState(1);
  const [dragged, setDragged] = useState(false);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [error, setError] = useState<MessageKey | undefined>();

  const handleOnDragEnter = () => setDragged(true);
  const handleOnDragLeave = () => setDragged(false);
  const handleOnDrop = () => setDragged(false);

  const handleOnFileDropAccepted = async (files: File[]) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result as string));
      reader.readAsDataURL(files[0]);
      setError(undefined);
    }
  };

  const handleOnFileDropRejected = (files: FileRejection[]) => {
    if (files.length > 0) {
      const rejectedFile = files[0];
      if (rejectedFile.file.size > MAX_IMAGE_SIZE_BYTES) {
        setError('msg_error_upload_invalid_file_size');
      } else if (!ALLOWED_IMAGE_FILE_TYPES.includes(rejectedFile.file.type)) {
        setError('msg_error_upload_invalid_file_type');
      }
    }
  };

  const handleImageRemove = () => {
    setSrc(undefined);
    setEditor(null);
  };

  const handleCancelClick = () => onCancel();

  const handleAvatarUpload = async () => {
    const canvas = editor?.getImageScaledToCanvas();
    if (!canvas) {
      return;
    }
    try {
      const blob = await BlobUtils.canvasToBlob(canvas);
      const file = new File([blob], 'avatar.png');
      await onAvatarSave(file);
    } catch {
      setError('msg_error_upload_server_error');
      setSrc(undefined);
      setEditor(null);
    }
  };

  if (saveInProgress) {
    return (
      <div className={classNames(styles.container, styles.savingInProgressMessage)}>
        <Typography styleType={TextType.MediumHeadline} WrapperElement="div">
          {t('msg_common_saving')}
        </Typography>
        <Icon
          className={styles.savingInProgressIcon}
          icon={IconType.Loading}
          iconStyle={IconStyle.Secondary}
          size={IconSize.XL}
          spin={true}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Typography styleType={TextType.LargeBoldHeadline}>{t('msg_label_avatar_upload_modal_title')}</Typography>
        {src && (
          <div className={styles.trashIconContainer} onClick={handleImageRemove}>
            <Icon className={styles.trashIcon} icon={IconType.Trash} />
          </div>
        )}
      </div>
      {src ? (
        <div className={styles.editorContainer}>
          <AvatarEditor
            ref={(ref) => setEditor(ref)}
            image={src}
            color={[255, 255, 255, 0.7]}
            borderRadius={128}
            width={200}
            height={200}
            border={[96, 16]}
            scale={scale}
          />
          <div className={styles.zoomSliderContainer}>
            <Typography WrapperElement="label" styleType={TextType.Body} className={styles.zoomSliderLabel}>
              {t('msg_label_avatar_editor_zoom_slider')}
            </Typography>
            <Slider className={styles.zoomSlider} min={1} max={6} step={0.2} value={scale} onChange={setScale} />
          </div>
        </div>
      ) : (
        <ImageUpload
          className={styles.imageUpload}
          dragOverClassName={styles.imageUploadDragOver}
          accept={ALLOWED_IMAGE_FILE_TYPES}
          maxSize={MAX_IMAGE_SIZE_BYTES}
          onDropAccepted={handleOnFileDropAccepted}
          onDropRejected={handleOnFileDropRejected}
          onDragEnter={handleOnDragEnter}
          onDragLeave={handleOnDragLeave}
          onDrop={handleOnDrop}
          error={error}
        />
      )}
      {!dragged && (
        <div className={styles.controlContainer}>
          <Button
            buttonStyle={ButtonStyle.Secondary}
            buttonColor={ButtonColor.Blue}
            disabled={!src}
            onClick={handleAvatarUpload}
          >
            {t('msg_label_save_changes_modal_confirm_button_label')}
          </Button>
          <Button buttonStyle={ButtonStyle.Text} buttonColor={ButtonColor.Black} onClick={handleCancelClick}>
            {t('msg_label_cancel_button_label')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;
