import classnames from 'classnames';
import React, { FunctionComponent, useState } from 'react';
import Select, { Props as ReactSelectProps } from 'react-select';

import Icon, { IconSize, IconType } from '@Components/Icon';
import Typography, { TextType } from '@Components/Typography';
import { useEventHandler } from '@Hooks/useEventHandler';

import { FormFieldRenderProps } from '../FormField';

import styles from './FilterSelect.module.scss';

export interface SelectProps extends FormFieldRenderProps<any>, ReactSelectProps {
  className?: string;
  labelClassName?: string;
  label?: string;
}

const FilterSelect: FunctionComponent<SelectProps> = ({
  className,
  labelClassName,
  classNamePrefix = 'FilterSelect',
  label,
  placeholder = null,
  isSearchable = false,
  isClearable = false,
  hideSelectedOptions = false,
  input,
  ...rest
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const containerRef = useEventHandler(
    'click',
    () => setMenuIsOpen(!menuIsOpen),
    () => setMenuIsOpen(false)
  );

  return (
    <div ref={containerRef} className={classnames(styles.container, className)}>
      {label && (
        <div className={classnames(styles.labelContainer)}>
          <Typography
            WrapperElement="label"
            styleType={TextType.TinyHeadline}
            className={classnames(styles.label, labelClassName)}
          >
            {label}
          </Typography>
          <div>
            <Icon
              className={styles.icon}
              icon={menuIsOpen ? IconType.CaretTop : IconType.CaretBottom}
              size={IconSize.M}
            />
          </div>
        </div>
      )}
      <Select
        classNamePrefix={classNamePrefix}
        menuIsOpen={menuIsOpen}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isClearable={isClearable}
        hideSelectedOptions={hideSelectedOptions}
        components={{
          LoadingIndicator: () => <Icon icon={IconType.Loading} loading={true} />,
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
          IndicatorsContainer: () => null,
        }}
        {...input}
        {...rest}
      />
    </div>
  );
};

export default FilterSelect;
