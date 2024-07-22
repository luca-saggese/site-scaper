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
import { useTranslation } from '@Utils/i18n';

import styles from './CanvasLayoutFormModalBody.module.scss';

interface FormValues {
  name: string;
  category: string;
}

interface CanvasLayoutFormModalBodyProps extends ModalProps {
  closeModal: (param?: { action: 'CONFIRM'; params: FormValues } | { action: 'CLOSE' }) => void;
}

const CanvasLayoutFormModalBody: React.FunctionComponent<CanvasLayoutFormModalBodyProps> = ({ closeModal }) => {
  const t = useTranslation();

  return (
    <ModalContainer>
      <Form<FormValues>
        initialValues={{ name: '', category: '' }}
        onSubmit={(formValues) => {
          closeModal({ action: 'CONFIRM', params: formValues });
        }}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.topContainer}>
                <Typography styleType={TextType.MediumHeadline} WrapperElement="div">
                  {t('msg_canvas_editor_save_as_layout_modal_title')}
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
                  name="name"
                  label={t('msg_canvas_editor_save_as_layout_modal_name_label')}
                  className={styles.input}
                  component={TextInput}
                  autoFocus
                  onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
                  validate={required()}
                />
                <FormField<TextInputProps<string>>
                  name="category"
                  label={t('msg_canvas_editor_save_as_layout_modal_category_label')}
                  className={styles.input}
                  component={TextInput}
                  validate={required()}
                />

                <div className={styles.controls}>
                  <Button buttonType={ButtonType.Submit} loading={submitting}>
                    {t('msg_common_save')}
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

export default CanvasLayoutFormModalBody;
