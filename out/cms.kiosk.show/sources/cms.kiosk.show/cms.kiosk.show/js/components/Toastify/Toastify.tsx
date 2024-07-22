import classnames from 'classnames';
import hash from 'object-hash';
import React from 'react';
import { Bounce, toast, ToastContainerProps, Zoom } from 'react-toastify';

import Icon, { IconStyle, IconType } from '@Components/Icon';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { TOAST_AUTO_CLOSE } from '@Config/constants';
import { MessageKey, useTranslation } from '@Utils/i18n';

import toastStyles from './Toastify.module.scss';

enum ToastifyContainerId {
  Error = 'Error-container',
  Info = 'Info-container',
}

interface ToastifyErrorProps {
  title: MessageKey;
  text: MessageKey;
}

const ToastifyErrorBody: React.FunctionComponent<ToastifyErrorProps> = ({ title, text }) => {
  const t = useTranslation();
  return (
    <>
      <Typography WrapperElement="div" styleType={TextType.UpperCaseLink}>
        {t(title)}
      </Typography>
      <Typography WrapperElement="div">{t(text)}</Typography>
    </>
  );
};

interface ToastifyInfoProps {
  text: MessageKey;
  tParams?: Record<string, unknown>;
}

const ToastifyInfoBody: React.FunctionComponent<ToastifyInfoProps> = ({ text, tParams }) => {
  const t = useTranslation();

  return <Typography WrapperElement="div">{t(text, tParams)}</Typography>;
};

interface ToastifyUndoProps {
  text: MessageKey;
  tParams?: Record<string, unknown>;
  onUndoClick: () => void;
}

const ToastifyUndoBody: React.FunctionComponent<ToastifyUndoProps> = ({ text, tParams, onUndoClick }) => {
  const t = useTranslation();

  return (
    <div className={toastStyles.undoContent}>
      <Typography WrapperElement="div" styleType={TextType.LowerCaseLink}>
        {t(text, tParams)}
      </Typography>
      <Typography WrapperElement="div" styleType={TextType.UpperCaseLink} color={TextColor.Black} onClick={onUndoClick}>
        {t('msg_common_undo')}
      </Typography>
    </div>
  );
};

const ToastifyCloseButton: React.FunctionComponent = () => {
  return <Icon icon={IconType.Close} iconStyle={IconStyle.None} />;
};

export const toastError = (title: MessageKey, text: MessageKey) => {
  toast.error(<ToastifyErrorBody title={title} text={text} />, {
    closeButton: <ToastifyCloseButton />,
    containerId: ToastifyContainerId.Error,
    hideProgressBar: true,
    toastId: hash({ title, text }),
  });
};

export const toastInfo = (text: MessageKey, tParams?: Record<string, unknown>) => {
  toast.info(<ToastifyInfoBody text={text} tParams={tParams} />, {
    closeButton: false,
    containerId: ToastifyContainerId.Info,
    hideProgressBar: true,
    toastId: hash(text),
  });
};

export const toastUndo = ({ text, tParams, onUndoClick }: ToastifyUndoProps) => {
  toast.info(<ToastifyUndoBody text={text} tParams={tParams} onUndoClick={onUndoClick} />, {
    closeButton: false,
    containerId: ToastifyContainerId.Info,
    hideProgressBar: true,
    toastId: hash(text),
  });
};

export const toastifyErrorConfig: ToastContainerProps = {
  autoClose: TOAST_AUTO_CLOSE,
  className: toastStyles.toastContainer,
  bodyClassName: toastStyles.toastErrorBody,
  toastClassName: classnames(toastStyles.toast, toastStyles.toastError),
  transition: Bounce,
  containerId: ToastifyContainerId.Error,
  position: 'top-right',
  enableMultiContainer: true,
  draggable: false,
};

export const toastifyInfoConfig: ToastContainerProps = {
  autoClose: TOAST_AUTO_CLOSE,
  className: toastStyles.toastContainer,
  toastClassName: classnames(toastStyles.toast, toastStyles.toastInfo),
  transition: Zoom,
  containerId: ToastifyContainerId.Info,
  position: 'bottom-center',
  enableMultiContainer: true,
  draggable: false,
};
