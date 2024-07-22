import classnames from 'classnames';
import React from 'react';

import FieldError from '@Components/Form/FieldError';
import { FormFieldRenderProps } from '@Components/Form/FormField';
import HelpButton from '@Components/HelpButton';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { disabledSubmitOnEnterKeyPress } from '@Utils/form';
import { noop } from '@Utils/helpers';

import styles from './UrlInput.module.scss';

export interface UrlInputProps extends FormFieldRenderProps<string> {
  className?: string;
  inputClassName?: string;
  containerClassName?: string;
  label?: string;
  title?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onHelpClick?: () => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  // Translation parameters
  tParams?: Record<string, unknown>;
}

const UrlInput: React.FunctionComponent<UrlInputProps> = ({
  className,
  inputClassName,
  input,
  label,
  autoComplete = 'off',
  meta,
  tParams = {},
  autoFocus,
  onKeyPress,
  onBlur = noop,
  onFocus = noop,
  onPaste = undefined,
  title,
  onHelpClick,
}) => {
  return (
    <div className={classnames(styles.container, className)} title={title}>
      <div className={styles.header}>
        <Typography styleType={TextType.TinyHeadline} WrapperElement="label" htmlFor={input.name}>
          {label}
        </Typography>
        {onHelpClick && <HelpButton onClick={onHelpClick} />}
      </div>
      <div className={styles.inputWrapper}>
        <Typography className={styles.protocol} styleType={TextType.TinyHeadline} color={TextColor.LightFadedBlue}>
          https://
        </Typography>
        <input
          {...input}
          id={input.name}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={classnames(inputClassName, styles.input, { [styles.error]: meta.touched && meta.error })}
          onFocus={(event) => {
            input.onFocus(event);
            onFocus(event);
          }}
          onBlur={(event) => {
            input.onBlur(event);
            onBlur(event);
          }}
          value={input.value?.includes('https://') ? input.value.replace(/https:\/\//gi, '') : input.value}
          onChange={(event) => {
            const newValue = event.currentTarget.value.replace(/https:\/\//gi, '').trim();
            input.onChange(newValue ? `https://${newValue}` : '');
          }}
          onPaste={onPaste}
          onKeyPress={onKeyPress || disabledSubmitOnEnterKeyPress}
        />
      </div>

      <FieldError tParams={tParams} meta={meta} />
    </div>
  );
};

export default UrlInput;
