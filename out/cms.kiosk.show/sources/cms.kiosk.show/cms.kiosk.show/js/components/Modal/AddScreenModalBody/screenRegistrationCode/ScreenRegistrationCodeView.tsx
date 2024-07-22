import React from 'react';
import { Form } from 'react-final-form';

import Button from '@Components/Button';
import FormField from '@Components/Form/FormField';
import TextInput from '@Components/Form/TextInput';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { allowOnlyInteger, composeValidators, exactLength, limitLength, required } from '@Utils/form';
import { useTranslation } from '@Utils/i18n';

import styles from './ScreenRegistrationCodeView.module.scss';

interface RegistrationCodeViewProps {
  registrationCode?: number;
  onSubmit: (formValues: { registrationCode?: number }) => void;
}

const ScreenRegistrationCodeView: React.FunctionComponent<RegistrationCodeViewProps> = ({
  registrationCode,
  onSubmit,
}) => {
  const t = useTranslation();

  return (
    <Form
      initialValues={{ registrationCode }}
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className={styles.container}>
          <Typography className={styles.title} styleType={TextType.MediumHeadline} WrapperElement="div">
            {t('msg_add_screen_modal_registration_code_view_title')}
          </Typography>
          <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_add_screen_modal_registration_code_view_subtitle')}
          </Typography>
          <FormField
            name="registrationCode"
            className={styles.registrationCodeViewInputContainer}
            inputClassName={styles.registrationCodeViewInput}
            component={TextInput}
            type="number"
            inputMode="decimal"
            tParams={{ length: 6 }}
            autoFocus
            validate={composeValidators(required(), exactLength(6))}
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
            format={(value) => (value ? limitLength(6)(String(value)) : '')}
            parse={allowOnlyInteger}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.currentTarget.value.length === 6) {
                e.currentTarget.blur();
                form.submit();
              }
            }}
          />
          <Button className={styles.nextAction}>{t('msg_add_screen_modal_pair_screen_button')}</Button>
          <div className={styles.bottomContainer}>
            <a
              href="https://support.kiosk.show/articles/screens/creating-a-kiosk-screen/"
              target="_blank"
              rel="noreferrer"
              className={styles.helpContainer}
            >
              <Typography styleType={TextType.UpperCaseLink}>
                {t('msg_add_screen_modal_registration_code_view_help_link')}
              </Typography>
            </a>
            <a href="https://tv.kiosk.show" target="_blank" rel="noreferrer" className={styles.helpContainer}>
              <Typography styleType={TextType.UpperCaseLink}>
                {t('msg_add_screen_modal_registration_code_view_browser_screen_link')}
              </Typography>
            </a>
          </div>
        </form>
      )}
    />
  );
};

export default ScreenRegistrationCodeView;
