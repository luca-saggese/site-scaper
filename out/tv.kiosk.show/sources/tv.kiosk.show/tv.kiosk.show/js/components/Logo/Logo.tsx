import React from 'react';
import styles from './Logo.module.scss';
import logo from '../../../images/logo.png';

function Logo() {
  return (
    <div className={styles.logo}>
      <img alt="logo" src={logo} />
    </div>
  );
}

export default Logo;
