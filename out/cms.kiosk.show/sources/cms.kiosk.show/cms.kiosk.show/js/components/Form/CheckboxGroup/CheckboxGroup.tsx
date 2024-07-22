import classnames from 'classnames';
import React from 'react';

import { FormFieldRenderProps } from '@Components/Form/FormField';
import Typography, { TextType } from '@Components/Typography';

import styles from './CheckboxGroup.module.scss';

interface CheckboxGroupProps extends FormFieldRenderProps<string[]> {
  options: { value: string; label: string }[];
  label: string;
  className: string;
}

const CheckboxGroup: React.FunctionComponent<CheckboxGroupProps> = ({ input, options, label, className }) => {
  return (
    <div className={className}>
      <Typography WrapperElement="div" styleType={TextType.TinyHeadline} className={styles.label}>
        {label}
      </Typography>
      {options.map((option) => {
        const selected = input.value.includes(option.value);
        return (
          <button
            type="button"
            key={String(option.value)}
            className={classnames(styles.option, { [styles.selected]: selected })}
            onClick={() => {
              input.onChange(
                selected ? input.value.filter((value) => value !== option.value) : [...input.value, option.value]
              );
            }}
          >
            <div className={styles.optionButton}>&#10004;</div>
            <Typography>{option.label}</Typography>
          </button>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
