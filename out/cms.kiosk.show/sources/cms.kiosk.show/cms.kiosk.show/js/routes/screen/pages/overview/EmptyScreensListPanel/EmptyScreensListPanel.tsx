import React from 'react';

import ContentBox, { ContextBoxStyle } from '@Components/Layout/ContentBox/ContentBox';
import Typography, { TextType } from '@Components/Typography';
import { useTranslation } from '@Utils/i18n';

import styles from './EmptyScreensListPanel.module.scss';
import { ReactComponent as Step1Image } from './step1.svg';
import { ReactComponent as Step2Image } from './step2.svg';
import { ReactComponent as Step3Image } from './step3.svg';

const EmptyScreensListPanel: React.FunctionComponent = () => {
  const t = useTranslation();

  return (
    <ContentBox boxStyle={ContextBoxStyle.Large} className={styles.container}>
      <Typography styleType={TextType.RegularHeadline} WrapperElement="div" className={styles.headline}>
        {t('msg_empty_screens_list_headline')}
      </Typography>
      <Typography styleType={TextType.Body} WrapperElement="div">
        {t('msg_empty_screens_list_text')}
      </Typography>
      <div className={styles.stepsContainer}>
        <a
          className={styles.step}
          href="https://support.kiosk.show/articles/screens/creating-a-kiosk-screen/"
          target="_blank"
          rel="noreferrer"
        >
          <Step1Image className={styles.stepImage} />
          <Typography styleType={TextType.LowerCaseLink} className={styles.stepDescription}>
            {t('msg_empty_screens_list_step1_description')}
          </Typography>
        </a>

        <div className={styles.step}>
          <Step2Image className={styles.stepImage} />
          <Typography styleType={TextType.LowerCaseLink} className={styles.stepDescription}>
            {t('msg_empty_screens_list_step2_description')}
          </Typography>
        </div>
        <div className={styles.step}>
          <Step3Image className={styles.stepImage} />
          <Typography styleType={TextType.LowerCaseLink} className={styles.stepDescription}>
            {t('msg_empty_screens_list_step3_description')}
          </Typography>
        </div>
      </div>
    </ContentBox>
  );
};

export default EmptyScreensListPanel;
