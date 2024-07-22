import React from 'react';
import { useHistory } from 'react-router';

import Typography, { TextType } from '../../components/Typography';
import { Links } from '../../config/constants';
import maintenanceImage from '../../../images/maintenance.png';
import { ReactComponent as MaintenanceBgImage } from '../../../images/maintenance_bg.svg';

import styles from './MaintenancePage.module.scss';
import { useDeviceQuery } from '../../graphql/graphqlTypes.generated';
import store from '../../utils/store';
import { useScaleView } from '../../hooks/useScaleView';
import { useTranslation } from '../../utils/i18n';

const MaintenancePage: React.FunctionComponent = () => {
  const history = useHistory();
  const t = useTranslation();

  useScaleView();

  useDeviceQuery({
    variables: {
      id: store.get('deviceId'),
    },
    pollInterval: 30 * 1000,
    onCompleted: () => {
      history.replace(Links.Home);
    },
    fetchPolicy: 'network-only',
  });

  return (
    <div className={styles.container}>
      <MaintenanceBgImage className={styles.bgImage} />
      <img src={maintenanceImage} className={styles.image} alt="maintenance" />
      <Typography className={styles.headline} styleType={TextType.MediumHeadline}>
        {t('msg_tv_maintenance_page_headline')}
      </Typography>
      <Typography>{t('msg_tv_maintenance_page_body')}</Typography>
    </div>
  );
};

export default MaintenancePage;
