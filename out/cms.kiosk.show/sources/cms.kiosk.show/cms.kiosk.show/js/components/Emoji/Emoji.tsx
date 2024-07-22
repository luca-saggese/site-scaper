import classnames from 'classnames';
import React from 'react';

import { getEmojiUrl } from '@Utils/emoji';
import { noop } from '@Utils/helpers';

import styles from './Emoji.module.scss';

interface EmojiProps {
  backgroundColor: string;
  code: string;
  className?: string;
  onClick?: () => void;
  emojiClassName?: string;
}

const Emoji: React.FunctionComponent<EmojiProps> = ({
  backgroundColor,
  code,
  className,
  onClick = noop,
  emojiClassName,
}) => {
  return (
    <div className={classnames(styles.container, className)} style={{ backgroundColor }} onClick={onClick}>
      <img className={classnames(styles.emojiImage, emojiClassName)} src={getEmojiUrl(code)} alt={code} />
    </div>
  );
};

export default Emoji;
