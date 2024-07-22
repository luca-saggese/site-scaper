import classNames from 'classnames';
import { fabric } from 'fabric';
import QRCode from 'qrcode';
import React from 'react';

import Button, { ButtonColor } from '@Components/Button';
import DropDown, { DropDownAlign, DropDownPosition } from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import SelectableOption from '@Components/DropDown/SelectableOption';
import Icon, { IconSize, IconStyle, IconType } from '@Components/Icon';
import { useModal } from '@Components/Modal';
import CanvasLayoutFormModalBody from '@Components/Modal/CanvasLayoutFormModalBody';
import FormModalBody from '@Components/Modal/FormModalBody';
import { MediaLibraryModalBody, PublicMediaLibraryModalBody } from '@Components/Modal/MediaLibraryModalBody';
import Typography, { TextType } from '@Components/Typography';
import { CANVAS_TEMPLATE_ID, SLIDE_TEMPLATE_HEIGHT, SLIDE_TEMPLATE_WIDTH } from '@Config/constants';
import CanvasColorDropdown from '@Routes/show/pages/editor/CanvasEditor/CanvasColorDropdown';
import {
  isImage,
  isLine,
  isTextbox,
  transformToFabricImage,
} from '@Routes/show/pages/editor/CanvasEditor/CanvasEditor.utils';
import { getImageCopyProperties, isQRCodeImage, toJson } from '@Utils/fabric';
import { disabledSubmitOnEnterKeyPress } from '@Utils/form';
import { logError, times } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './CanvasEditorHeader.module.scss';

const fonts = ['Arial', 'Brush Script MT', 'Comic Sans MS', 'Courier New', 'Helvetica', 'Times New Roman'];

const fontSizeFactor = 10;

interface CanvasEditorHeaderProps {
  canvas: fabric.Canvas;
  onSave: () => void;
  saveDisabled: boolean;
  isPublic: boolean;
  onSaveLayout?: (input: { name: string; data: string; category: string; templateId: string }) => void;
}

const CanvasEditorHeader = ({ canvas, isPublic, onSave, onSaveLayout, saveDisabled }: CanvasEditorHeaderProps) => {
  const { showModal } = useModal();
  const t = useTranslation();

  const activeObject = canvas.getActiveObject();

  function getLeftSideMenuItems() {
    if (!activeObject) {
      return [
        <CanvasColorDropdown
          name={t('msg_canvas_editor_background')}
          className={styles.clickableItem}
          selected={canvas.backgroundColor}
          onChange={(color) => {
            canvas.backgroundColor = color.hex;
            canvas.fire('canvas:property-changed');
          }}
        />,
      ];
    }

    const elements: JSX.Element[] = [];

    if (isImage(activeObject)) {
      if (isQRCodeImage(activeObject)) {
        elements.push(
          <button
            className={classNames(styles.changeImageButton, styles.clickableItem)}
            onClick={async () => {
              const result = await showModal({
                component: FormModalBody,
                props: {
                  title: t('msg_canvas_editor_qrcode_modal_title'),
                  label: t('msg_canvas_editor_qrcode_modal_label'),
                  submitButtonText: t('msg_canvas_editor_qrcode_modal_submit_button_change'),
                  value: activeObject.data.value,
                },
              });

              if (result.action !== 'CONFIRM') {
                return;
              }

              activeObject.data.value = result.params;
              activeObject.setSrc(
                await QRCode.toDataURL(result.params, {
                  width: 400,
                  margin: 0,
                  errorCorrectionLevel: 'H',
                })
              );
              canvas.fire('object:property-changed');
            }}
          >
            <Typography>{t('msg_canvas_editor_change_qr_code_value')}</Typography>
          </button>
        );
      } else {
        elements.push(
          <button
            className={classNames(styles.changeImageButton, styles.clickableItem)}
            onClick={() => {
              showModal({
                component: isPublic ? PublicMediaLibraryModalBody : MediaLibraryModalBody,
                props: {
                  onItemSelect: async (item) => {
                    if (!item) {
                      return;
                    }

                    try {
                      const image = await transformToFabricImage(item.url);

                      image.set(getImageCopyProperties(activeObject.toJSON()));

                      if (image.width && image.height) {
                        const currentWidth = (activeObject.width || 0) * (activeObject.scaleX || 0);
                        const currentHeight = (activeObject.height || 0) * (activeObject.scaleY || 0);

                        image.set('scaleX', currentWidth / image.width);
                        image.set('scaleY', currentHeight / image.height);
                      }

                      const activeObjectIndex = canvas.getObjects().indexOf(activeObject);
                      canvas.insertAt(image, activeObjectIndex, true);
                      canvas.setActiveObject(image);
                    } catch (e) {
                      logError(e);
                    }
                  },
                },
              });
            }}
          >
            <Typography>{t('msg_canvas_editor_change_image')}</Typography>
          </button>
        );
      }
    }

    if (isTextbox(activeObject)) {
      elements.push(
        <DropDown
          className={styles.clickableItem}
          component={
            <>
              <Typography>{t('msg_canvas_editor_font')}</Typography>
              <Icon className={styles.dropdownCaret} icon={IconType.CaretBottom} size={IconSize.XS} />
            </>
          }
          position={DropDownPosition.Bottom}
          align={DropDownAlign.Start}
        >
          {fonts.map((font) => (
            <DropDownItem
              key={font}
              onClick={() => {
                activeObject.set({ fontFamily: font });
                activeObject.dirty = true;
                canvas.fire('object:property-changed');
              }}
            >
              <SelectableOption text={font} selected={activeObject.fontFamily === font} />
            </DropDownItem>
          ))}
        </DropDown>
      );
      elements.push(
        <>
          <Typography>{t('msg_canvas_editor_font_size')}</Typography>
          <DropDown
            className={styles.clickableItem}
            component={
              <input
                type="number"
                className={styles.fontSizeInput}
                value={activeObject.fontSize ? activeObject.fontSize / fontSizeFactor : undefined}
                onKeyPress={disabledSubmitOnEnterKeyPress}
                onChange={(e) => {
                  const newValue = e.currentTarget.value;

                  if (newValue) {
                    activeObject.set({ fontSize: Math.min(Math.max(Number(newValue), 1), 100) * fontSizeFactor });
                  } else {
                    activeObject.set({ fontSize: undefined });
                  }

                  activeObject.dirty = true;
                  canvas.fire('object:property-changed');
                }}
                onBlur={() => {
                  if (activeObject.fontSize === undefined) {
                    activeObject.set({ fontSize: 20 * fontSizeFactor });
                    activeObject.dirty = true;
                    canvas.fire('object:property-changed');
                  }
                }}
              />
            }
            position={DropDownPosition.Bottom}
            align={DropDownAlign.Start}
          >
            {times(10)
              .map((size) => (size + 1) * 10 * fontSizeFactor)
              .map((size) => (
                <DropDownItem
                  key={size}
                  onClick={() => {
                    activeObject.set({ fontSize: size });
                    activeObject.dirty = true;
                    canvas.fire('object:property-changed');
                  }}
                >
                  <SelectableOption text={size / fontSizeFactor} selected={activeObject.fontSize === size} />
                </DropDownItem>
              ))}
          </DropDown>
        </>
      );
      elements.push(
        <div className={styles.fontIconsContainer}>
          <Icon
            icon={IconType.Bold}
            onClick={() => {
              activeObject.set({ fontWeight: activeObject.fontWeight === 'bold' ? 'normal' : 'bold' });
              activeObject.dirty = true;
              canvas.fire('object:property-changed');
            }}
            size={IconSize.L}
            iconStyle={IconStyle.None}
            className={classNames(styles.fontIcon, { [styles.activeIcon]: activeObject.fontWeight === 'bold' })}
          />
          <Icon
            icon={IconType.Italic}
            onClick={() => {
              activeObject.set({ fontStyle: activeObject.fontStyle === 'italic' ? 'normal' : 'italic' });
              activeObject.dirty = true;
              canvas.fire('object:property-changed');
            }}
            size={IconSize.L}
            iconStyle={IconStyle.None}
            className={classNames(styles.fontIcon, { [styles.activeIcon]: activeObject.fontStyle === 'italic' })}
          />
          <Icon
            icon={IconType.Underline}
            onClick={() => {
              activeObject.set({ underline: !activeObject.underline });
              activeObject.dirty = true;
              canvas.fire('object:property-changed');
            }}
            size={IconSize.L}
            iconStyle={IconStyle.None}
            className={classNames(styles.fontIcon, { [styles.activeIcon]: activeObject.underline })}
          />
        </div>
      );
    }

    if (!isImage(activeObject) && !isLine(activeObject)) {
      elements.push(
        <CanvasColorDropdown
          name={t('msg_canvas_editor_color')}
          className={styles.clickableItem}
          selected={activeObject.fill}
          onChange={(color) => {
            activeObject.set({ fill: color.hex });
            activeObject.dirty = true;
            canvas.fire('object:property-changed');
          }}
        />
      );
    }

    if (!isImage(activeObject)) {
      elements.push(
        <>
          <CanvasColorDropdown
            name={t('msg_canvas_editor_stroke_color')}
            className={styles.clickableItem}
            selected={activeObject.stroke}
            onChange={(color) => {
              activeObject.set({ stroke: color.hex });
              activeObject.dirty = true;
              canvas.fire('object:property-changed');
            }}
          />
          <DropDown
            className={styles.clickableItem}
            component={
              <>
                <Typography>{t('msg_canvas_editor_stroke_width')}</Typography>
                <Icon className={styles.dropdownCaret} icon={IconType.CaretBottom} size={IconSize.XS} />
              </>
            }
            position={DropDownPosition.Bottom}
            align={DropDownAlign.Start}
          >
            {times(10).map((width) => (
              <DropDownItem
                key={width}
                onClick={() => {
                  activeObject.set({ strokeWidth: width });
                  activeObject.dirty = true;
                  canvas.fire('object:property-changed');
                }}
              >
                <SelectableOption text={`${width} px`} selected={activeObject.strokeWidth === width} />
              </DropDownItem>
            ))}
          </DropDown>
        </>
      );
    }

    elements.push(
      <DropDown
        className={styles.clickableItem}
        component={
          <>
            <Typography>{t('msg_canvas_editor_position')}</Typography>
            <Icon className={styles.dropdownCaret} icon={IconType.CaretBottom} size={IconSize.XS} />
          </>
        }
      >
        <div className={styles.positionDropdown}>
          <Typography styleType={TextType.TinyHeadline}>{t('msg_canvas_editor_layers')}</Typography>
          <div className={styles.orderIconsContainer}>
            <div
              className={styles.positionDropdownClickableItem}
              onClick={() => {
                canvas.bringToFront(activeObject);
                canvas.fire('object:order-changed');
              }}
            >
              <Icon
                icon={IconType.ArrowTop}
                size={IconSize.L}
                iconStyle={IconStyle.None}
                className={styles.orderIcon}
              />
              <Typography>{t('msg_canvas_editor_bring_to_front')}</Typography>
            </div>
            <div
              className={styles.positionDropdownClickableItem}
              onClick={() => {
                canvas.bringForward(activeObject, true);
                canvas.fire('object:order-changed');
              }}
            >
              <Icon icon={IconType.ArrowUp} size={IconSize.L} iconStyle={IconStyle.None} className={styles.orderIcon} />
              <Typography>{t('msg_canvas_editor_bring_forward')}</Typography>
            </div>
            <div
              className={styles.positionDropdownClickableItem}
              onClick={() => {
                canvas.sendBackwards(activeObject, true);
                canvas.fire('object:order-changed');
              }}
            >
              <Icon
                icon={IconType.ArrowDown}
                size={IconSize.L}
                iconStyle={IconStyle.None}
                className={styles.orderIcon}
              />
              <Typography>{t('msg_canvas_editor_send_backward')}</Typography>
            </div>
            <div
              className={styles.positionDropdownClickableItem}
              onClick={() => {
                canvas.sendToBack(activeObject);
                canvas.fire('object:order-changed');
              }}
            >
              <Icon
                icon={IconType.ArrowBottom}
                size={IconSize.L}
                iconStyle={IconStyle.None}
                className={styles.orderIcon}
              />
              <Typography>{t('msg_canvas_editor_send_to_back')}</Typography>
            </div>
          </div>
          <Typography styleType={TextType.TinyHeadline}>{t('msg_canvas_editor_align')}</Typography>
          <div className={styles.alignIconsContainer}>
            <div
              className={styles.positionDropdownClickableItem}
              onClick={() => {
                activeObject.set({
                  top: SLIDE_TEMPLATE_HEIGHT / 2 - ((activeObject.height || 0) * (activeObject.scaleY || 0)) / 2,
                });
                canvas.fire('object:property-changed');
              }}
            >
              <Icon
                icon={IconType.AlignVertical}
                size={IconSize.L}
                iconStyle={IconStyle.None}
                className={styles.alignIcon}
              />
              <Typography>{t('msg_canvas_editor_align_vertically')}</Typography>
            </div>
            <div
              className={styles.positionDropdownClickableItem}
              onClick={() => {
                activeObject.set({
                  left: SLIDE_TEMPLATE_WIDTH / 2 - ((activeObject.width || 0) * (activeObject.scaleX || 0)) / 2,
                });
                canvas.fire('object:property-changed');
              }}
            >
              <Icon
                icon={IconType.AlignHorizontal}
                size={IconSize.L}
                iconStyle={IconStyle.None}
                className={styles.alignIcon}
              />
              <Typography>{t('msg_canvas_editor_align_horizontally')}</Typography>
            </div>
          </div>
        </div>
      </DropDown>
    );

    return elements;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        {getLeftSideMenuItems().map((elem, index) => {
          return (
            <React.Fragment key={index}>
              {!!index && <div className={styles.divider} />}
              {elem}
            </React.Fragment>
          );
        })}
      </div>
      <div className={styles.rightSide}>
        {!activeObject && onSaveLayout && (
          <Button
            className={styles.saveButton}
            buttonColor={ButtonColor.Blue}
            onClick={async () => {
              const result = await showModal({
                component: CanvasLayoutFormModalBody,
              });

              if (result.action === 'CLOSE') {
                return;
              }

              onSaveLayout({
                ...result.params,
                data: toJson(canvas),
                templateId: CANVAS_TEMPLATE_ID,
              });
            }}
          >
            {t('msg_canvas_editor_save_as_layout')}
          </Button>
        )}
        <Button className={styles.saveButton} onClick={onSave} disabled={saveDisabled}>
          {t('msg_common_save')}
        </Button>
      </div>
    </div>
  );
};

export default CanvasEditorHeader;
