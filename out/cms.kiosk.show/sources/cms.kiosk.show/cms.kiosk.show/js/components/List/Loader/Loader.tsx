import classNames from 'classnames';
import React from 'react';

import Icon, { IconType } from '@Components/Icon';
import Typography from '@Components/Typography';
import { useTranslation } from '@Utils/i18n';

import styles from './Loader.module.scss';

export interface LoaderProps {
  className?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ className }) => {
  const t = useTranslation();
  return (
    <div className={classNames(styles.container, className)}>
      <Icon className={styles.icon} icon={IconType.Loading} spin={true} />
      <Typography>{t('msg_label_list_loader_more')}</Typography>
    </div>
  );
};

export default Loader;
