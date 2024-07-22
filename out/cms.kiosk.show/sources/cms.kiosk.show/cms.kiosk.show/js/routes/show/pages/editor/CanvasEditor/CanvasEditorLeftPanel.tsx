import { fabric } from 'fabric';
import QRCode from 'qrcode';
import React, { SetStateAction } from 'react';

import Icon, { IconSize, IconStyle, IconType } from '@Components/Icon';
import { useModal } from '@Components/Modal';
import FormModalBody from '@Components/Modal/FormModalBody';
import { MediaLibraryModalBody, PublicMediaLibraryModalBody } from '@Components/Modal/MediaLibraryModalBody';
import Typography, { TextType } from '@Components/Typography';
import { transformToFabricImage } from '@Routes/show/pages/editor/CanvasEditor/CanvasEditor.utils';
import { QRCodeImage } from '@Utils/fabric';
import { logError } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './CanvasEditorLeftPanel.module.scss';

interface CanvasEditorLeftPanelProps {
  canvas: fabric.Canvas;
  isPublic: boolean;
  setTemplateSelectionVisible: React.Dispatch<SetStateAction<boolean>>;
}

const CanvasEditorLeftPanel = ({ canvas, isPublic, setTemplateSelectionVisible }: CanvasEditorLeftPanelProps) => {
  const { showModal } = useModal();
  const t = useTranslation();

  const addRectangle = () => {
    canvas.add(
      new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'black',
        width: 400,
        height: 400,
      })
    );
  };

  const addCircle = () => {
    canvas.add(
      new fabric.Circle({
        left: 100,
        top: 100,
        fill: 'black',
        radius: 200,
      })
    );
  };

  const addTriangle = () => {
    canvas.add(
      new fabric.Triangle({
        left: 100,
        top: 100,
        fill: 'black',
        width: 400,
        height: 400,
      })
    );
  };

  const addLine = () => {
    canvas.add(
      new fabric.Line([0, 0, 400, 0], {
        left: 100,
        top: 100,
        stroke: 'black',
        strokeWidth: 8,
      })
    );
  };

  const addText = () => {
    canvas.add(
      new fabric.Textbox('Text', {
        left: 100,
        top: 100,
        fontSize: 200,
        lockScalingY: true,
      })
    );
  };

  const addImage = () => {
    showModal({
      component: isPublic ? PublicMediaLibraryModalBody : MediaLibraryModalBody,
      props: {
        onItemSelect: async (item) => {
          if (!item) {
            return;
          }

          try {
            const image = await transformToFabricImage(item.url);
            canvas.add(image);
          } catch (e) {
            logError(e);
          }
        },
      },
    });
  };

  const addQRCode = async () => {
    const result = await showModal({
      component: FormModalBody,
      props: {
        title: t('msg_canvas_editor_qrcode_modal_title'),
        label: t('msg_canvas_editor_qrcode_modal_label'),
        submitButtonText: t('msg_canvas_editor_qrcode_modal_submit_button_create'),
        value: '',
      },
    });

    if (result.action !== 'CONFIRM') {
      return;
    }

    fabric.Image.fromURL(
      await QRCode.toDataURL(result.params, { width: 400, margin: 0, errorCorrectionLevel: 'H' }),
      (image) => {
        (image as QRCodeImage).data = { type: 'QR_CODE', value: result.params };
        image.set({
          left: 100,
          top: 100,
          width: 400,
          height: 400,
        });
        canvas.add(image);
      }
    );
  };

  const toggleTemplateSelection = () => {
    setTemplateSelectionVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer} onClick={toggleTemplateSelection}>
          <Icon icon={IconType.Layout} size={IconSize.XL} iconStyle={IconStyle.None} />
          <Typography styleType={TextType.SmallBody}>{t('msg_canvas_editor_layout')}</Typography>
        </div>

        <div className={styles.divider} />

        <div className={styles.iconContainer} onClick={addText}>
          <Icon icon={IconType.TextEdit} size={IconSize.XL} iconStyle={IconStyle.None} />
          <Typography styleType={TextType.SmallBody}>{t('msg_canvas_editor_text')}</Typography>
        </div>
        <div className={styles.iconContainer} onClick={addImage}>
          <Icon icon={IconType.Image} size={IconSize.XL} iconStyle={IconStyle.None} />
          <Typography styleType={TextType.SmallBody}>{t('msg_canvas_editor_image')}</Typography>
        </div>
        <div className={styles.iconContainer} onClick={addQRCode}>
          <Icon icon={IconType.QRCode} size={IconSize.XL} iconStyle={IconStyle.None} />
          <Typography styleType={TextType.SmallBody}>{t('msg_canvas_editor_qrcode')}</Typography>
        </div>
        <div className={styles.iconContainer} onClick={addRectangle}>
          <Icon icon={IconType.Rectangle} size={IconSize.XL} iconStyle={IconStyle.None} />
          <Typography styleType={TextType.SmallBody}>{t('msg_canvas_editor_rectangle')}</Typography>
        </div>
        <div className={styles.iconContainer} onClick={addCircle}>
          <Icon icon={IconType.Circle} size={IconSize.XL} iconStyle={IconStyle.None} />
          <Typography styleType={TextType.SmallBody}>{t('msg_canvas_editor_circle')}</Typography>
        </div>
        <div className={styles.iconContainer} onClick={addTriangle}>
          <Icon icon={IconType.Triangle} size={IconSize.XL} iconStyle={IconStyle.None} />
          <Typography styleType={TextType.SmallBody}>{t('msg_canvas_editor_triangle')}</Typography>
        </div>
        <div className={styles.iconContainer} onClick={addLine}>
          <Icon icon={IconType.Line} size={IconSize.XL} iconStyle={IconStyle.None} />
          <Typography styleType={TextType.SmallBody}>{t('msg_canvas_editor_line')}</Typography>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditorLeftPanel;
