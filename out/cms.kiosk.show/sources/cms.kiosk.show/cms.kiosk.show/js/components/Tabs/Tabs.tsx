import classnames from 'classnames';
import React from 'react';

import Typography, { TextType } from '@Components/Typography';

import styles from './Tabs.module.scss';

interface TabsProps<T> {
  value: T;
  options: T[];
  onChange: (newValue: T) => void;
}

const Tabs = <T extends string | number>({ value, options, onChange }: TabsProps<T>) => {
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div
          key={option}
          className={classnames(styles.option, value === option && styles.active)}
          onClick={() => {
            onChange(option);
          }}
        >
          <Typography styleType={TextType.LowerCaseLink}>{option}</Typography>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
