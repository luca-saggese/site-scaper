import React, { FunctionComponent } from 'react';

import Divider from '@Components/Divider';
import Typography, { TextType } from '@Components/Typography';
import { LocalStorage } from '@Config/constants';
import { useTranslation } from '@Utils/i18n';
import { getFromLocalStorage } from '@Utils/localStorage';

import styles from './RedirectInfoMessage.module.scss';

export interface RedirectInfoMessageProps {}

const RedirectInfoMessage: FunctionComponent<RedirectInfoMessageProps> = () => {
  const t = useTranslation();
  const redirectPath = getFromLocalStorage(LocalStorage.TargetLocation);

  if (!redirectPath || (redirectPath.split('/').filter(Boolean).length < 2 && !redirectPath.includes('?'))) {
    return null;
  }

  const url = `${window.location.hostname}${redirectPath}`;

  return (
    <div className={styles.container}>
      <Typography WrapperElement="div">
        {t('msg_label_login_redirect', { url: '' })}
        <Typography className={styles.url} styleType={TextType.LowerCaseLink}>
          {url}
        </Typography>
      </Typography>
      <Divider className={styles.divider} />
    </div>
  );
};

export default RedirectInfoMessage;
