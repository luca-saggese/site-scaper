import React from 'react';
import { FallbackProps } from 'react-error-boundary';

import Typography, { TextType } from '@Components/Typography';

import styles from './ErrorBoundaryFallback.module.scss';

const ErrorBoundaryFallback: React.FunctionComponent<FallbackProps> = ({ error }) => {
  return (
    <div className={styles.container}>
      <div className={styles.alert}>
        <Typography styleType={TextType.MediumHeadline} WrapperElement="div">
          Something went wrong:
        </Typography>
        {error && <pre>{error.message}</pre>}
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
