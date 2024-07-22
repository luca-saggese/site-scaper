import classnames from 'classnames';
import React from 'react';

import FieldError from '@Components/Form/FieldError';
import Typography from '@Components/Typography';
import { noop } from '@Utils/helpers';

import { FormFieldRenderProps } from '../FormField';

import styles from './Toggle.module.scss';

export interface ToggleProps extends FormFieldRenderProps<boolean> {
  label?: React.ReactNode;
  className?: string;
  title?: string;
  onChange?: (newValue: boolean) => void;
}

const Toggle: React.FunctionComponent<ToggleProps> = ({ label, className, input, meta, title, onChange = noop }) => {
  return (
    <div className={classnames(styles.container, className)} title={title}>
      <div className={styles.topContainer}>
        {label && (
          <Typography className={styles.typography} WrapperElement="label">
            {label}
          </Typography>
        )}
        <input
          checked={input.checked}
          onChange={(event) => {
            input.onChange(event);
            onChange(!input.checked);
            input.onBlur();
          }}
          type="checkbox"
          className={styles.toggleSwitchCheckbox}
          id={input.name}
        />
        <label
          className={styles.toggleSwitchLabel}
          htmlFor={input.name}
          onMouseDown={() => {
            input.onFocus();
          }}
        >
          <span className={styles.toggleSwitchButton} />
        </label>
      </div>
      <FieldError meta={meta} />
    </div>
  );
};

export default Toggle;
