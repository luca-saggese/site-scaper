import classnames from 'classnames';
import React from 'react';

import Button, { ButtonColor, ButtonProps, ButtonStyle } from '@Components/Button';
import Icon, { IconStyle, IconType } from '@Components/Icon';

import styles from './SocialButton.module.scss';

export enum SocialButtonType {
  Google = 'google',
  Email = 'email',
}

export interface SocialButtonProps extends Omit<ButtonProps, 'buttonStyle' | 'contentClassName'> {
  socialType: SocialButtonType;
}

const SocialButton: React.FunctionComponent<SocialButtonProps> = ({
  children,
  className,
  socialType,
  ...buttonProps
}) => {
  const getSocialButtonIcon = (type: SocialButtonType) => {
    switch (type) {
      case SocialButtonType.Google:
        return IconType.Google;
      case SocialButtonType.Email:
        return IconType.Register;
      default:
        return IconType.Register;
    }
  };
  return (
    <Button
      className={classnames(className, styles.button)}
      buttonStyle={ButtonStyle.Social}
      buttonColor={ButtonColor.White}
      {...buttonProps}
    >
      <div className={styles.iconWrapper}>
        <Icon iconStyle={IconStyle.None} icon={getSocialButtonIcon(socialType)} />
      </div>
      <div className={styles.content}>{children}</div>
    </Button>
  );
};

export default SocialButton;
