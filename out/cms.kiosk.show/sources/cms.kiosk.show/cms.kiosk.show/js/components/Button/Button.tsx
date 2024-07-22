import classnames from 'classnames';
import React from 'react';

import Icon, { IconStyle, IconType } from '@Components/Icon';
import Typography, { TextType } from '@Components/Typography';
import { noop } from '@Utils/helpers';

import styles from './Button.module.scss';

export interface ButtonProps {
  className?: string;
  contentClassName?: string;
  buttonType?: ButtonType;
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColor;
  buttonTextStyle?: TextType;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

export enum ButtonType {
  Submit = 'submit',
  Reset = 'reset',
  Button = 'button',
}

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
  Social = 'social',
  Text = 'text',
}

export enum ButtonColor {
  Green = 'green',
  Blue = 'blue',
  Red = 'red',
  White = 'white',
  Black = 'black',
}

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  contentClassName,
  buttonType = ButtonType.Submit,
  buttonStyle = ButtonStyle.Primary,
  buttonColor = ButtonColor.Green,
  buttonTextStyle,
  children,
  disabled = false,
  onClick = noop,
  loading = false,
}) => {
  const textStyle =
    buttonTextStyle || (buttonStyle !== ButtonStyle.Social && TextType.UpperCaseLink) || TextType.LowerCaseLink;

  const getIconStyle = (style: ButtonStyle) => {
    switch (style) {
      case ButtonStyle.Primary:
        return IconStyle.Primary;
      case ButtonStyle.Secondary:
        return IconStyle.Secondary;
      default:
        return IconStyle.Primary;
    }
  };
  const buttonClassName = classnames(
    loading && styles.loading,
    disabled && styles.disabled,
    styles.button,
    styles[buttonStyle],
    styles[buttonColor],
    className
  );
  return (
    <button
      className={buttonClassName}
      type={buttonType}
      disabled={disabled || loading}
      onClick={(!disabled && !loading && onClick) || noop}
    >
      {loading ? (
        <Icon icon={IconType.Loading} spin={true} loading={true} iconStyle={getIconStyle(buttonStyle)} />
      ) : (
        <Typography styleType={textStyle} className={classnames(styles.typography)} WrapperElement="div">
          <div className={classnames(styles.content, contentClassName)}>{children}</div>
        </Typography>
      )}
    </button>
  );
};

export default Button;
