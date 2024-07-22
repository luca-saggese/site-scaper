import React from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '@Components/Logo';
import { RouteConfig } from '@Config/routes';

import styles from './NavigationBarLogo.module.scss';

export interface NavigationBarLogoComponentProps {
  onClick?: () => void;
}

const NavigationBarLogo: React.FunctionComponent<NavigationBarLogoComponentProps> = ({ onClick }) => {
  const history = useHistory();

  const onLogoClick = () => {
    history.push(RouteConfig.Home.buildLink());
  };

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} onClick={onClick || onLogoClick} />
    </div>
  );
};

export default NavigationBarLogo;
