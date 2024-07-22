import classnames from 'classnames';
import React from 'react';

import Icon, { IconType } from '@Components/Icon';
import Typography, { TextType } from '@Components/Typography';

import styles from './SelectableOption.module.scss';

interface SelectableOptionProps {
  selected: boolean;
  text: React.ReactNode;
  image?: React.ReactNode;
}

const SelectableOption: React.FunctionComponent<SelectableOptionProps> = ({ selected, image, text }) => {
  return (
    <div className={classnames(styles.container, { [styles.withImage]: image })}>
      {image}
      <Typography
        className={classnames(styles.optionText, { [styles.selectedText]: selected })}
        styleType={selected ? TextType.LowerCaseLink : TextType.Body}
      >
        {text}
      </Typography>
      {selected && <Icon className={styles.icon} icon={IconType.Tick} />}
    </div>
  );
};

export default SelectableOption;
