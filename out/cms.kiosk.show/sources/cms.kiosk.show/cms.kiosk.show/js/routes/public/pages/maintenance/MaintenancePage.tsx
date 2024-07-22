import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Image from '@Components/Image';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { fetchAppConfig } from '@Graphql/app/config.queries';
import MaintenanceImage from '@Images/maintenance.png';
import { ReactComponent as MaintenanceBgImage } from '@Images/maintenance_bg.svg';
import { useTranslation } from '@Utils/i18n';

import styles from './MaintenancePage.module.scss';

const MaintenancePage: React.FunctionComponent = () => {
  const t = useTranslation();
  const history = useHistory();

  useEffect(() => {
    const checkIfMaintenanceOver = () => {
      fetchAppConfig()
        .then(() => {
          history.replace(RouteConfig.Home.buildLink());
        })
        .catch(() => {
          // retry after 30 sec
          setTimeout(checkIfMaintenanceOver, 30 * 1000);
        });
    };

    checkIfMaintenanceOver();
  }, [history]);

  return (
    <div className={styles.container}>
      <MaintenanceBgImage className={styles.bgImage} />
      <Image className={styles.image} src={MaintenanceImage} />
      <Typography className={styles.headline} styleType={TextType.MediumHeadline}>
        {t('msg_maitenance_headline')}
      </Typography>
      <Typography>{t('msg_maitenance_text')}</Typography>
    </div>
  );
};

export default MaintenancePage;
