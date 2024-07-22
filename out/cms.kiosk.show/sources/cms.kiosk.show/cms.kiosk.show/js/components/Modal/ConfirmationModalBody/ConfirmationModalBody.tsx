import React from 'react';

import Button, { ButtonColor, ButtonStyle } from '@Components/Button';
import { ModalProps } from '@Components/Modal';

import styles from './ConfirmationModalBody.module.scss';

interface ConfirmationModalProps extends ModalProps {
  confirmButton: {
    label: string;
    color: ButtonColor;
  };
  cancelButton: {
    label: string;
    color: ButtonColor;
  };
  content: React.ReactNode;
  closeModal: (param?: { action: 'CONFIRM' } | { action: 'CLOSE' }) => void;
}

const ConfirmationModalBody: React.FunctionComponent<ConfirmationModalProps> = ({
  confirmButton,
  cancelButton,
  content,
  closeModal,
}) => {
  const handleCancelButtonClick = () => {
    closeModal();
  };

  const handleConfirmButtonClick = () => {
    closeModal({ action: 'CONFIRM' });
  };

  return (
    <div className={styles.container}>
      <div>{content}</div>
      <div className={styles.controls}>
        <Button
          className={styles.confirmButton}
          buttonStyle={ButtonStyle.Secondary}
          buttonColor={confirmButton.color}
          onClick={handleConfirmButtonClick}
        >
          {confirmButton.label}
        </Button>
        <Button onClick={handleCancelButtonClick} buttonStyle={ButtonStyle.Text} buttonColor={cancelButton.color}>
          {cancelButton.label}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModalBody;
