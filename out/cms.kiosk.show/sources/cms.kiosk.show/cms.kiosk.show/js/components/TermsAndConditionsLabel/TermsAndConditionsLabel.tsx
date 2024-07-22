import React from 'react';

import Typography, { TextType } from '@Components/Typography';
import { useTranslation } from '@Utils/i18n';

import styles from './TermsAndConditionsLabel.module.scss';

const TermsAndConditionsLabel = () => {
  const t = useTranslation();
  return (
    <div className={styles.container}>
      <span className={styles.text}>{t('msg_field_label_accept_terms_and_conditions_part_1')}</span>
      <a
        href="https://www.iubenda.com/terms-and-conditions/81571119"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <Typography styleType={TextType.UpperCaseLink}>
          {t('msg_field_label_accept_terms_and_conditions_part_2')}
        </Typography>
      </a>
      <span className={styles.text}>{t('msg_field_label_accept_terms_and_conditions_part_3')}</span>
      <a
        href="https://www.iubenda.com/privacy-policy/81571119/legal"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <Typography styleType={TextType.UpperCaseLink}>
          {t('msg_field_label_accept_terms_and_conditions_part_4')}
        </Typography>
      </a>
    </div>
  );
};

export default TermsAndConditionsLabel;
