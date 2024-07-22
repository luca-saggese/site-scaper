import React from 'react';
import { FieldMetaState } from 'react-final-form';

import Typography from '@Components/Typography';
import { useTranslation } from '@Utils/i18n';

import styles from './FieldError.module.scss';

export interface FieldErrorProps<T = unknown> {
  className?: string;
  // Translation parameters
  tParams?: Record<string, unknown>;
  meta: FieldMetaState<T>;
}

const FieldError: React.FunctionComponent<FieldErrorProps> = ({ meta, tParams = {} }) => {
  const t = useTranslation();
  const errorValue = meta.touched && meta.error;
  const submitErrorValue = meta.touched && !meta.dirtySinceLastSubmit && meta.submitError;

  const error = errorValue || submitErrorValue;

  if (!error) {
    return null;
  }

  return <Typography className={styles.error}>{t(error, tParams)}</Typography>;
};

export default FieldError;
