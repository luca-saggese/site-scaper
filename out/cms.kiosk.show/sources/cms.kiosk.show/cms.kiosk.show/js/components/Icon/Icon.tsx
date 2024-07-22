import classnames from 'classnames';
import React from 'react';

import { noop } from '@Utils/helpers';

import styles from './Icon.module.scss';

interface IconProps {
  icon: IconType;
  size?: IconSize;
  iconStyle?: IconStyle;
  spin?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
}

export enum IconSize {
  XXS = 'xxs',
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
  Auto = 'auto',
  Default = 'default',
}

export enum IconType {
  Eye = 'eye',
  FullScreen = 'fullScreen',
  Loading = 'loading',
  More = 'more',
  Pencil = 'pencil',
  Search = 'search',
  Google = 'google',
  Register = 'register',
  UserAvatarPlaceholder = 'userAvatarPlaceholder',
  OrganizationAvatarPlaceholder = 'organizationAvatarPlaceholder',
  ChannelAvatarPlaceholder = 'channelAvatarPlaceholder',
  Close = 'close',
  CaretLeft = 'caretLeft',
  CaretBottom = 'caretBottom',
  CaretTop = 'caretTop',
  Tick = 'tick',
  Trash = 'trash',
  Dropbox = 'dropbox',
  Rotate = 'rotate',
  Share = 'share',
  Fork = 'fork',
  Shapes = 'shapes',
  TextEdit = 'textEdit',
  Image = 'image',
  Rectangle = 'rectangle',
  Circle = 'circle',
  Triangle = 'triangle',
  Line = 'line',
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  ArrowUp = 'arrowUp',
  ArrowDown = 'arrowDown',
  ArrowTop = 'arrowTop',
  ArrowBottom = 'arrowBottom',
  AlignVertical = 'alignVertical',
  AlignHorizontal = 'alignHorizontal',
  QRCode = 'qrCode',
  ShareScreen = 'shareScreen',
  Layout = 'layout',
}

export enum IconStyle {
  Primary = 'primary',
  Secondary = 'secondary',
  None = 'none',
}

const Icon: React.FunctionComponent<IconProps> = ({
  icon,
  size = IconSize.Default,
  spin = false,
  className,
  onClick = noop,
  iconStyle = IconStyle.Primary,
  disabled = false,
  loading = false,
  title,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require,global-require
  const IconSvg = require(`!!@svgr/webpack?-svgo,+titleProp,+ref!@Images/icons/${icon}.svg`).default;
  const iconElementClassName = classnames(
    styles.icon,
    spin && styles.spin,
    size === IconSize.Default ? `Icon__${size}` : styles[size],
    iconStyle !== IconStyle.None && styles[iconStyle],
    disabled && styles.disabled,
    loading && styles.loading,
    className
  );
  return (
    <IconSvg onClick={(!disabled && !loading && onClick) || noop} className={iconElementClassName} title={title} />
  );
};

export default Icon;
