import React from 'react';
import { Form } from 'react-final-form';

import Button, { ButtonType } from '@Components/Button';
import FormField from '@Components/Form/FormField';
import TextInput, { TextInputProps } from '@Components/Form/TextInput';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import { ModalProps } from '@Components/Modal';
import ModalContainer from '@Components/Modal/ModalContainer';
import Typography, { TextType } from '@Components/Typography';
import { required } from '@Utils/form';

import styles from './FormModalBody.module.scss';

interface FormValues {
  value: string;
}

interface FormModalBodyProps extends ModalProps {
  title: string;
  label: string;
  submitButtonText: string;
  value: string;
  closeModal: (param?: { action: 'CONFIRM'; params: string } | { action: 'CLOSE' }) => void;
}

const FormModalBody: React.FunctionComponent<FormModalBodyProps> = ({
  title,
  label,
  submitButtonText,
  value,
  closeModal,
}) => {
  return (
    <ModalContainer>
      <Form<FormValues>
        initialValues={{ value }}
        onSubmit={(formValues) => {
          closeModal({ action: 'CONFIRM', params: formValues.value });
        }}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.topContainer}>
                <Typography styleType={TextType.MediumHeadline} WrapperElement="div">
                  {title}
                </Typography>
                <Icon
                  icon={IconType.Close}
                  iconStyle={IconStyle.None}
                  className={styles.closeIcon}
                  onClick={() => {
                    closeModal();
                  }}
                />
              </div>
              <div className={styles.content}>
                <FormField<TextInputProps<string>>
                  name="value"
                  label={label}
                  className={styles.input}
                  component={TextInput}
                  autoFocus
                  onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
                  validate={required()}
                />

                <div className={styles.controls}>
                  <Button buttonType={ButtonType.Submit} loading={submitting}>
                    {submitButtonText}
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      />
    </ModalContainer>
  );
};

export default FormModalBody;
