import classnames from 'classnames';
import React from 'react';

import NavigationBarLinks from '@Components/Layout/NavigationBar/components/NavigationBarLinks';
import NavigationBarLogo from '@Components/Layout/NavigationBar/components/NavigationBarLogo';
import NavigationBarSettings from '@Components/Layout/NavigationBar/components/NavigationBarSettings';

import navigationBarStyles from '../NavigationBar.module.scss';

import styles from './MainNavigationBar.module.scss';

export interface MainNavigationBarProps {
  className?: string;
}

const MainNavigationBar: React.FunctionComponent<MainNavigationBarProps> = ({ className }) => {
  return (
    <nav className={classnames(navigationBarStyles.container, styles.container, className)}>
      <NavigationBarLogo />
      <NavigationBarLinks />
      <NavigationBarSettings />
    </nav>
  );
};

export default MainNavigationBar;
