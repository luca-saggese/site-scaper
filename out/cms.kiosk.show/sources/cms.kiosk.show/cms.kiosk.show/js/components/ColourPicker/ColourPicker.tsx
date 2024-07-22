import classNames from 'classnames';
import React from 'react';
import { ColorChangeHandler, CustomPicker, InjectedColorProps } from 'react-color';
import { Checkboard, Hue, Saturation } from 'react-color/lib/components/common';

import styles from './ColourPicker.module.scss';

interface ColourPickerProps extends InjectedColorProps {
  allowTransparent?: boolean;
}

const ColourPicker: React.FunctionComponent<ColourPickerProps> = (props) => {
  const handleOnChange: ColorChangeHandler = (color) => {
    props.onChange?.(color);
  };

  return (
    <div className={styles.container}>
      <div className={styles.saturation}>
        <Saturation {...props} onChange={handleOnChange} />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.preview} style={{ backgroundColor: props.hex }} />
        {props.allowTransparent && (
          <div
            className={classNames(styles.transparent, { [styles.transparentActive]: props.hex === 'transparent' })}
            onClick={() => props.onChange?.('transparent')}
          >
            <Checkboard size={4} white="#fff" grey="#999" />
          </div>
        )}
        <div className={styles.hue}>
          <Hue {...props} onChange={handleOnChange} />
        </div>
      </div>
    </div>
  );
};

interface CustomPickerProps {
  color: string | undefined;
  onChange: (color: { hex: string }) => void;
  allowTransparent?: boolean;
}

// React color picker has invalid typescript type definitions
export default CustomPicker(ColourPicker as any) as React.ComponentType<CustomPickerProps>;
