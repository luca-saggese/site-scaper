import React from 'react';
import { Form } from 'react-final-form';

import Button from '@Components/Button';
import FormField from '@Components/Form/FormField';
import TextInput from '@Components/Form/TextInput';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { ScreenFragment } from '@Graphql/graphqlTypes.generated';
import { required } from '@Utils/form';
import { useTranslation } from '@Utils/i18n';

import styles from './ScreenNameView.module.scss';

interface FormValues {
  name: string;
}

interface ScreenNameViewProps {
  screen: ScreenFragment;
  onSubmit: (formValues: FormValues) => void;
}

const ScreenNameView: React.FunctionComponent<ScreenNameViewProps> = ({ screen, onSubmit }) => {
  const t = useTranslation();

  return (
    <Form<FormValues>
      initialValues={{ name: screen.name }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.container}>
          <Typography className={styles.title} styleType={TextType.MediumHeadline} WrapperElement="div">
            {t('msg_add_screen_modal_name_view_title')}
          </Typography>
          <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_add_screen_modal_name_view_subtitle')}
          </Typography>
          <FormField
            name="name"
            component={TextInput}
            autoFocus
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
            className={styles.nameTvViewInputContainer}
            inputClassName={styles.nameTvViewInput}
            placeholder={t('msg_add_screen_modal_name_view_input_placeholder')}
            validate={required()}
          />
          <Button className={styles.nextAction}>{t('msg_common_next')}</Button>
        </form>
      )}
    />
  );
};

export default ScreenNameView;
