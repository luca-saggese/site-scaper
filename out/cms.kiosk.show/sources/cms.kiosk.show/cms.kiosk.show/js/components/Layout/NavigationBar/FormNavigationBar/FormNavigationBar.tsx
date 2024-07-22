import classnames from 'classnames';
import React from 'react';

import NavigationBarLogo from '@Components/Layout/NavigationBar/components/NavigationBarLogo';

import navigationBarStyles from '../NavigationBar.module.scss';

import styles from './FormNavigationBar.module.scss';

export interface FormNavigationBarProps {
  className?: string;
  onLogoClick?: () => void;
}

const FormNavigationBar: React.FunctionComponent<FormNavigationBarProps> = ({ className, children, onLogoClick }) => {
  return (
    <nav className={classnames(navigationBarStyles.container, styles.container, className)}>
      <NavigationBarLogo onClick={onLogoClick} />
      {children}
    </nav>
  );
};

export default FormNavigationBar;
