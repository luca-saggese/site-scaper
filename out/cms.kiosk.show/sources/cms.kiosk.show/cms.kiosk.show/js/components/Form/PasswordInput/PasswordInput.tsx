import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import FieldError from '@Components/Form/FieldError';
import Typography from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { useTranslation } from '@Utils/i18n';

import { FormFieldRenderProps } from '../FormField';

import styles from './PasswordInput.module.scss';

export interface PasswordInputProps extends FormFieldRenderProps<string> {
  className?: string;
  inputClassName?: string;
  label?: string;
  autoComplete?: string;
  placeholder?: string;
  autoFocus?: boolean;
  // Translation parameters
  tParams?: Record<string, unknown>;
  showErrorAfterSubmitFailed?: boolean;
}

const PasswordInput: FunctionComponent<PasswordInputProps> = ({
  className,
  inputClassName,
  input,
  label,
  autoComplete = 'off',
  meta,
  tParams = {},
  placeholder,
  autoFocus,
  showErrorAfterSubmitFailed = false,
}) => {
  const t = useTranslation();
  const history = useHistory();

  const handleForgotPasswordClick = () => {
    history.push(RouteConfig.ResetPassword.buildLink());
  };
  return (
    <div className={classnames(styles.textInput, className)}>
      {label && <Typography WrapperElement="label">{label}</Typography>}
      <div className={styles.inputContainer}>
        <input
          {...input}
          autoComplete={autoComplete}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={inputClassName}
          type="password"
        />
        <div className={styles.forgotPassword} onClick={handleForgotPasswordClick}>
          <Typography className={styles.text}>{t('msg_label_forgot_password')}</Typography>
        </div>
      </div>
      {(showErrorAfterSubmitFailed ? meta.submitFailed : true) && <FieldError tParams={tParams} meta={meta} />}
    </div>
  );
};

export default PasswordInput;
