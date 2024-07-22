import React, { FunctionComponent } from 'react';

import MainPageLayout from '@Components/Layout/MainPageLayout';
import MainNavigationBar from '@Components/Layout/NavigationBar/MainNavigationBar';
import Loader from '@Components/Loader';
import Typography, { TextType } from '@Components/Typography';
import { useTranslation } from '@Utils/i18n';

import styles from './NotPermittedPage.module.scss';

export interface NotPermittedPageProps {}

const NotPermittedPage: FunctionComponent<NotPermittedPageProps> = () => {
  const t = useTranslation();

  return (
    <MainPageLayout NavigationBarComponent={<MainNavigationBar />}>
      <div className={styles.container}>
        <Loader iconClassName={styles.loaderIcon} />
        <div className={styles.textContainer}>
          <Typography styleType={TextType.MediumHeadline}>{t('msg_label_not_permitted_title_label')}</Typography>
          <Typography>{t('msg_label_not_permitted_text_label')}</Typography>
        </div>
      </div>
    </MainPageLayout>
  );
};

export default NotPermittedPage;
