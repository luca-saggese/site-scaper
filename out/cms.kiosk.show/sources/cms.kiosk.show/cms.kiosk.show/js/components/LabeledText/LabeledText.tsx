import classnames from 'classnames';
import React from 'react';

import Typography, { TextType } from '@Components/Typography';

import styles from './LabeledText.module.scss';

export interface LabeledTextProps {
  className?: string;
  label: string;
}

const LabeledText: React.FunctionComponent<LabeledTextProps> = ({ className, label, children }) => {
  return (
    <div className={classnames(className, styles.container)}>
      <Typography styleType={TextType.TinyHeadline} WrapperElement="label" className={styles.label}>
        {label}
      </Typography>
      {children}
    </div>
  );
};

export default LabeledText;
