import classnames from 'classnames';
import React from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import styles from './Link.module.scss';

interface LinkProps extends ReactRouterLinkProps {
  linkStyle?: LinkStyle;
  disabled?: boolean;
  to: string;
  active?: boolean;
}

export enum LinkStyle {
  Light = 'light',
  Dark = 'dark',
}

const Link: React.FunctionComponent<LinkProps> = ({
  children,
  className,
  linkStyle = LinkStyle.Light,
  disabled = false,
  active = false,
  ...linkRouterProps
}) => {
  return (
    <ReactRouterLink
      className={classnames(
        className,
        styles.link,
        styles[linkStyle],
        disabled && styles.disabled,
        active && styles.active
      )}
      {...linkRouterProps}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;
