import React from 'react';

import MainPageLayout from '@Components/Layout/MainPageLayout';
import MainNavigationBar from '@Components/Layout/NavigationBar/MainNavigationBar';
import Sidebar from '@Components/Sidebar';

import styles from './SettingsLayout.module.scss';

const SettingsLayout: React.FunctionComponent = ({ children }) => {
  return (
    <MainPageLayout NavigationBarComponent={<MainNavigationBar />} limitBodyWidth={false}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.content}>{children}</div>
    </MainPageLayout>
  );
};

export default SettingsLayout;
