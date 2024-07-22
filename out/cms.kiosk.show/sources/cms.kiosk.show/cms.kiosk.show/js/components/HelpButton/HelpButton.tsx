import React from 'react';

import Typography, { TextType } from '@Components/Typography';

import styles from './HelpButton.module.scss';

interface HelpButtonProps {
  onClick: () => void;
}

const HelpButton: React.FunctionComponent<HelpButtonProps> = ({ onClick }) => {
  return (
    <Typography className={styles.container} styleType={TextType.TinyLink} onClick={onClick}>
      ?
    </Typography>
  );
};

export default HelpButton;
