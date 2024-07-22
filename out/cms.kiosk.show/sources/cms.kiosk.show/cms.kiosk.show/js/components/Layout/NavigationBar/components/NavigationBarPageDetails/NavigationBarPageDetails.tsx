import React, { FunctionComponent } from 'react';

import Typography from '@Components/Typography';

import styles from './NavigationBarPageDetails.module.scss';

export interface NavigationPageDetailsProps {
  pageDetails?: string;
}

const NavigationBarPageDetails: FunctionComponent<NavigationPageDetailsProps> = ({ pageDetails }) => {
  return (
    <Typography className={styles.container} WrapperElement="div">
      {pageDetails}
    </Typography>
  );
};

export default NavigationBarPageDetails;
