import classnames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '@Components/Logo';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';

import styles from './LogoHeader.module.scss';

export interface LogoHeaderProps {
  text?: string;
}

const LogoHeader: React.FunctionComponent<LogoHeaderProps> = ({ text }) => {
  const history = useHistory();
  const onLogoClickHandler = () => history.push(RouteConfig.Login.buildLink());

  return (
    <div className={classnames(styles.logoHeaderContainer)}>
      <Logo onClick={onLogoClickHandler} />
      {text && (
        <Typography styleType={TextType.MediumHeadline} className={styles.typography} WrapperElement="h3">
          {text}
        </Typography>
      )}
    </div>
  );
};

export default LogoHeader;
