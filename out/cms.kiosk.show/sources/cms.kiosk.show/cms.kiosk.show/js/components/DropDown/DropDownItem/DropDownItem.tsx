import classnames from 'classnames';
import React, { useContext } from 'react';

import { DropdownContext } from '@Components/DropDown';
import { noop } from '@Utils/helpers';

import styles from './DropDownItem.module.scss';

export interface DropDownItemComponentProps {
  className?: string;
  onClick?: () => void;
  closeOnClick?: boolean;
  disabled?: boolean;
}

const DropDownItem: React.FunctionComponent<DropDownItemComponentProps> = ({
  children,
  className,
  onClick = noop,
  closeOnClick = true,
  disabled = false,
}) => {
  const context = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent) => {
    if (closeOnClick) {
      context.closeDropdown();
    }

    if (disabled) return;

    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className={classnames(styles.dropdownItem, className, { [styles.disabled]: disabled })}
      onClick={handleClick}
      role="menuitem"
    >
      {children}
    </div>
  );
};

export default DropDownItem;
