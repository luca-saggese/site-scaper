import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';

import Icon, { IconSize, IconStyle, IconType } from '@Components/Icon';
import Typography, { TextType } from '@Components/Typography';

import { FormFieldRenderProps } from '../FormField';

import styles from './Select.module.scss';

export enum SelectStyle {
  Primary = 'style-primary',
  Secondary = 'style-secondary',
}

export interface SelectProps extends FormFieldRenderProps<any>, ReactSelectProps {
  className?: string;
  labelClassName?: string;
  label?: string;
  selectStyle?: SelectStyle;
}

const Select: FunctionComponent<SelectProps> = ({
  className,
  labelClassName,
  classNamePrefix = 'Select',
  label,
  placeholder = null,
  isSearchable = false,
  isClearable = false,
  hideSelectedOptions = false,
  selectStyle = SelectStyle.Primary,
  input,
  meta,
  title,
  ...rest
}) => {
  return (
    <div className={classnames(styles.container, className)} title={title}>
      {label && (
        <Typography
          WrapperElement="label"
          styleType={TextType.TinyHeadline}
          className={classnames(styles.label, labelClassName)}
          htmlFor={input.name}
        >
          {label}
        </Typography>
      )}

      <button id={input.name} className={styles.button}>
        <ReactSelect
          className={classnames('Select', styles[selectStyle], { [styles.error]: meta.error })}
          classNamePrefix={classNamePrefix}
          placeholder={placeholder}
          isSearchable={isSearchable}
          isClearable={isClearable}
          hideSelectedOptions={hideSelectedOptions}
          components={{
            Option: (props) => {
              const selected = props.isSelected || (!props.hasValue && !props.data.value);
              return (
                <div className={styles.option} {...props.innerProps}>
                  <Typography
                    className={classnames(selected && styles.selectedText, styles.optionText)}
                    styleType={selected ? TextType.LowerCaseLink : TextType.Body}
                  >
                    {props.data.label}
                  </Typography>
                  {selected && (
                    <div>
                      <Icon className={styles.icon} icon={IconType.Tick} />
                    </div>
                  )}
                </div>
              );
            },
            IndicatorsContainer: ({ selectProps }) => (
              <Icon
                className={styles.icon}
                icon={selectProps.menuIsOpen ? IconType.CaretTop : IconType.CaretBottom}
                iconStyle={selectStyle === SelectStyle.Primary ? IconStyle.Primary : IconStyle.Secondary}
                size={IconSize.M}
              />
            ),
          }}
          {...input}
          {...rest}
        />
      </button>
    </div>
  );
};

export default Select;
