import classnames from 'classnames';
import React, { ReactNode, useState } from 'react';
import { Popover } from 'react-tiny-popover';

import { noop } from '@Utils/helpers';

import styles from './DropDown.module.scss';

export enum DropDownPosition {
  Right = 'right',
  Bottom = 'bottom',
}

export enum DropDownAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export interface DropDownComponentProps {
  className?: string;
  contentClassName?: string;
  component: ReactNode;
  position?: DropDownPosition;
  align?: DropDownAlign;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const DropdownContext = React.createContext({
  closeDropdown: noop,
});

const DropDown: React.FunctionComponent<DropDownComponentProps> = ({
  children,
  className,
  component,
  contentClassName,
  position = DropDownPosition.Bottom,
  align = DropDownAlign.End,
  disabled = false,
  onClose = noop,
  onOpen = noop,
}) => {
  const [contentVisible, setContentVisible] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    if (!disabled) {
      setContentVisible(!contentVisible);
      if (!contentVisible) {
        onOpen();
      } else {
        onClose();
      }
    }
  };

  const handleClose = () => {
    setContentVisible(false);
    onClose();
  };

  return (
    <Popover
      isOpen={contentVisible}
      onClickOutside={handleClose}
      positions={[position]}
      containerStyle={{ overflow: 'visible', zIndex: '5' }}
      padding={10}
      align={align}
      content={
        <DropdownContext.Provider value={{ closeDropdown: handleClose }}>
          {children && (
            <div className={classnames(styles.content, contentClassName)} role="menu">
              {children}
            </div>
          )}
        </DropdownContext.Provider>
      }
    >
      <div className={classnames(styles.dropdown, className)} onClick={handleClick}>
        {component}
      </div>
    </Popover>
  );
};

interface SubDropdownProps {
  component: React.ReactNode;
  contentClassName?: string;
}

export const SubDropdown: React.FunctionComponent<SubDropdownProps> = ({ children, component, contentClassName }) => {
  return (
    <div className={styles.subDropdown}>
      {component}
      <div className={styles.subDropdownContent}>
        <div className={classnames(styles.content, contentClassName)}>{children}</div>
      </div>
    </div>
  );
};

export default DropDown;
