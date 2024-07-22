import classnames from 'classnames';
import React from 'react';

import FieldError from '@Components/Form/FieldError';
import HelpButton from '@Components/HelpButton';
import Typography from '@Components/Typography';
import { disabledSubmitOnEnterKeyPress } from '@Utils/form';
import { noop } from '@Utils/helpers';

import { FormFieldRenderProps } from '../FormField';

import styles from './TextInput.module.scss';

export interface TextInputProps<TValue> extends FormFieldRenderProps<TValue> {
  className?: string;
  inputClassName?: string;
  containerClassName?: string;
  label?: string;
  title?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  // Translation parameters
  tParams?: Record<string, unknown>;
  showErrorAfterSubmitFailed?: boolean;
  onHelpClick?: () => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

const TextInput = <TValue extends string | number>({
  className,
  inputClassName,
  input,
  label,
  autoComplete = 'off',
  meta,
  tParams = {},
  placeholder,
  autoFocus,
  onKeyPress,
  onKeyUp,
  onFocus = noop,
  title,
  inputMode,
  showErrorAfterSubmitFailed = false,
  onHelpClick,
  onPaste = undefined,
}: TextInputProps<TValue>) => {
  return (
    <div className={classnames(styles.container, className)} title={title}>
      {label && (
        <div className={styles.header}>
          <Typography WrapperElement="label" htmlFor={input.name}>
            {label}
          </Typography>
          {onHelpClick && <HelpButton onClick={onHelpClick} />}
        </div>
      )}
      <input
        {...input}
        id={input.name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={classnames(inputClassName, styles.input, { [styles.error]: meta.touched && meta.error })}
        onFocus={(event) => {
          input.onFocus(event);
          onFocus(event);
        }}
        onPaste={onPaste}
        inputMode={inputMode}
        onKeyPress={onKeyPress || disabledSubmitOnEnterKeyPress}
        onKeyUp={onKeyUp}
      />
      {(showErrorAfterSubmitFailed ? meta.submitFailed : true) && <FieldError tParams={tParams} meta={meta} />}
    </div>
  );
};

export default TextInput;
