import { Gradient, Pattern } from 'fabric/fabric-impl';
import React from 'react';
import { Checkboard } from 'react-color/lib/components/common';

import ColourPicker from '@Components/ColourPicker/ColourPicker';
import DropDown, { DropDownAlign, DropDownPosition } from '@Components/DropDown';
import Icon, { IconSize, IconType } from '@Components/Icon';
import Typography from '@Components/Typography';

import styles from './CanvasEditorHeader.module.scss';

interface CanvasColorDropdownProps {
  name: string;
  className?: string;
  selected?: string | Pattern | Gradient;
  onChange: (color: { hex: string }) => void;
}

const CanvasColorDropdown = ({ name, className, selected, onChange }: CanvasColorDropdownProps) => {
  const color = typeof selected === 'string' ? selected : undefined;
  return (
    <DropDown
      className={className}
      component={
        <>
          <div className={styles.colorIndicator} style={{ backgroundColor: color }}>
            {color === 'transparent' && <Checkboard size={4} white="#fff" grey="#999" />}
          </div>
          <Typography>{name}</Typography>
          <Icon className={styles.dropdownCaret} icon={IconType.CaretBottom} size={IconSize.XS} />
        </>
      }
      contentClassName={styles.backgroundDropdownContent}
      position={DropDownPosition.Bottom}
      align={DropDownAlign.Start}
    >
      <ColourPicker color={color} onChange={onChange} allowTransparent />
    </DropDown>
  );
};

export default CanvasColorDropdown;
