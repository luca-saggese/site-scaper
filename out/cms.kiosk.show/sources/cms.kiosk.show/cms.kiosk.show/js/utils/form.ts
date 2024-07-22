import React from 'react';
import isEmail from 'validator/es/lib/isEmail';

import { MINIMUM_SHOW_DURATION } from '@Config/constants';
import { isValidUrl, parseTime } from '@Utils/helpers';
import { MessageKey } from '@Utils/i18n';

const passwordRegex = RegExp(/^(?=(.*[a-zA-Z])+)(?=(.*[\d])+).{8,}$/);

type ValidationType<T> = (value: T) => MessageKey | undefined;
type ValidationResultType<T> = ReturnType<ValidationType<T>>;

export const composeValidators = <T = any>(...validators: ValidationType<T>[]) => (value: T): ValidationResultType<T> =>
  validators.reduce((error: ValidationResultType<T>, validator: ValidationType<T>) => {
    return error || validator(value);
  }, undefined);

export const required: (error?: MessageKey) => ValidationType<any> = (error = 'msg_error_required') => (value) => {
  return value ? undefined : error;
};

export const email: ValidationType<string> = (value) => {
  return value && isEmail(value) ? undefined : 'msg_error_invalid_email';
};

export const password: ValidationType<string> = (value) => {
  return value && passwordRegex.test(value) ? undefined : 'msg_error_invalid_password';
};

export const min = (length: number): ValidationType<string> => (value) => {
  return value && value.length >= length ? undefined : 'msg_error_minimum_length';
};

export const exactLength = (length: number): ValidationType<string | number> => (value) => {
  return String(value) && String(value).length === length ? undefined : 'msg_error_exact_length';
};

export const limitLength = (length: number) => (value: string) => {
  if (!value) {
    return value;
  }

  return value.slice(0, length);
};

export const allowOnlyInteger = (value: string) => {
  if (!value) {
    return value;
  }

  return Number(value.replace(/[^0-9]/g, ''));
};

export const googleSlidesUrl: ValidationType<string> = (url) => {
  if (!url || (url.startsWith('https://docs.google.com/presentation') && url.includes('/embed'))) {
    return undefined;
  }

  return 'msg_error_google_slides_url';
};

export const url = (value: string) => {
  return !value || isValidUrl(value) ? undefined : 'msg_error_invalid_url';
};

export const disabledSubmitOnEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.currentTarget.blur();
  }
};

export const minimumDuration: ValidationType<string> = (value) => {
  const duration = parseTime(value);
  return duration < MINIMUM_SHOW_DURATION ? 'msg_error_minimum_duration' : undefined;
};

export const integerMinMax = (value: string, min?: number, max?: number): MessageKey | undefined => {
  if (!min || !max) return undefined;

  const number = Number(value);
  if (number < min) return 'msg_error_minimum_value_exceeded';
  if (number > max) return 'msg_error_maximum_value_exceeded';

  return undefined;
};
