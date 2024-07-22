import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainerProps, Zoom } from 'react-toastify';
import Typography, { TextType } from '../Typography';
import styles from './Toastify.module.scss';
import Icon, { IconType } from '../Icon';
import { TOAST_AUTO_CLOSE } from '../../config/constants';

interface ToastifyInfoProps {
  title: string;
  text: string;
}

const ToastifyErrorBody = ({ title, text }: ToastifyInfoProps) => {
  return (
    <div className={styles.toastError}>
      <Typography WrapperElement="div" className={styles.toastTitle} styleType={TextType.UpperCaseLink}>
        {title}
      </Typography>
      <Typography WrapperElement="div">{text}</Typography>
    </div>
  );
};

const ToastifyInfoBody = ({ title, text }: ToastifyInfoProps) => {
  return (
    <div className={styles.toastInfo}>
      <Icon icon={IconType.Loading} className={styles.loadingIcon} />
      <div>
        <Typography WrapperElement="div" className={styles.toastTitle} styleType={TextType.UpperCaseLink}>
          {title}
        </Typography>
        <Typography WrapperElement="div">{text}</Typography>
      </div>
    </div>
  );
};

export const toastError = (title: string, text: string, autoClose: number | false = TOAST_AUTO_CLOSE) => {
  toast(<ToastifyErrorBody title={title} text={text} />, {
    closeButton: <Icon icon={IconType.Close} />,
    hideProgressBar: true,
    autoClose,
  });
};

export const toastInfo = (title: string, text: string) => {
  toast(<ToastifyInfoBody title={title} text={text} />, {
    closeButton: false,
    hideProgressBar: true,
    autoClose: false,
  });
};

export const toastifyConfig: ToastContainerProps = {
  autoClose: TOAST_AUTO_CLOSE,
  className: styles.toastContainer,
  transition: Zoom,
  position: 'top-right',
  draggable: false,
  toastClassName: styles.toast,
};
