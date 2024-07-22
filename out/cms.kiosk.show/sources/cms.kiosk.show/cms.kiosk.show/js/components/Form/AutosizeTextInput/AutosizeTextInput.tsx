import classNames from 'classnames';
import React from 'react';
import AutosizeInput from 'react-input-autosize';

import FieldError from '@Components/Form/FieldError';
import { FormFieldRenderProps } from '@Components/Form/FormField';
import { disabledSubmitOnEnterKeyPress } from '@Utils/form';
import { noop } from '@Utils/helpers';

import styles from './AutosizeTextInput.module.scss';

export interface AutosizeTextInputProps extends FormFieldRenderProps<string> {
  className?: string;
  // Translation parameters
  tParams?: Record<string, unknown>;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

const AutosizeTextInput: React.FunctionComponent<AutosizeTextInputProps> = ({
  className,
  input,
  onFocus = noop,
  autoComplete,
  autoFocus,
  placeholder,
  meta,
  tParams = {},
}) => {
  return (
    <div className={classNames(className, styles.textInput)}>
      <AutosizeInput
        {...input}
        type="string"
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onFocus={(event) => {
          input.onFocus(event);
          onFocus(event);
        }}
        onKeyPress={disabledSubmitOnEnterKeyPress}
      />
      <div>
        <FieldError tParams={tParams} meta={meta} />
      </div>
    </div>
  );
};

export default AutosizeTextInput;
