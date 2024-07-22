import classnames from 'classnames';
import React from 'react';
import AutosizeInput, { AutosizeInputProps } from 'react-input-autosize';

import FieldError from '@Components/Form/FieldError';
import { FormFieldRenderProps } from '@Components/Form/FormField';
import Typography, { TextType } from '@Components/Typography';
import { useEventHandler } from '@Hooks/useEventHandler';

import styles from './AutoSaveFormField.module.scss';

export interface AutoSaveFormFieldProps
  extends FormFieldRenderProps<string>,
    Pick<AutosizeInputProps, 'onKeyPress' | 'onFocus'> {
  className?: string;
  label?: string;
  inputClassName?: string;
  // Translation parameters
  tParams?: Record<string, unknown>;
  focused?: boolean;
  setFocused: (value: boolean) => void;
  handleSubmit?: () => void;
  displayTextType?: TextType;
  disabled?: boolean;
}

const AutoSaveFormField: React.FunctionComponent<AutoSaveFormFieldProps> = ({
  className,
  inputClassName,
  input,
  label,
  setFocused,
  focused,
  handleSubmit,
  meta,
  displayTextType = TextType.Body,
  tParams,
  onFocus,
  onKeyPress,
  disabled,
}) => {
  const ref = useEventHandler(
    'click',
    () => {
      if (!disabled) {
        setFocused(true);
      }
    },
    (event) => {
      const target = event.target as HTMLElement;
      const toastClicked = target.outerHTML.includes('Toastify');
      if (toastClicked) {
        return;
      }
      if (meta.dirty && handleSubmit && !disabled) {
        handleSubmit();
      } else {
        setFocused(false);
      }
    }
  );

  return (
    <div className={classnames(className, styles.container, disabled && styles.disabled)}>
      {label && (
        <Typography styleType={TextType.TinyHeadline} WrapperElement="label" className={styles.label}>
          {label}
        </Typography>
      )}
      <div ref={ref}>
        {focused ? (
          <AutosizeInput
            autoFocus={true}
            type="string"
            inputClassName={classnames(inputClassName, styles.input, disabled && styles.disabled)}
            value={input.value || ''}
            onChange={input.onChange}
            onFocus={onFocus}
            onKeyPress={onKeyPress}
          />
        ) : (
          <Typography className={styles.display} styleType={displayTextType}>
            {input.value}
          </Typography>
        )}
      </div>
      <FieldError meta={meta} tParams={tParams} />
    </div>
  );
};

export default AutoSaveFormField;
