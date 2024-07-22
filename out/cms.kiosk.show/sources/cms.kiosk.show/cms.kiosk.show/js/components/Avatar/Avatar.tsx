import classnames from 'classnames';
import React, { CSSProperties } from 'react';

import Image from '@Components/Image';
import Placeholder, { PlaceholderColor, PlaceholderType } from '@Components/Placeholder';
import { noop } from '@Utils/helpers';

import styles from './Avatar.module.scss';

export interface UserAvatarComponentProps {
  avatar?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

const Avatar: React.FunctionComponent<UserAvatarComponentProps> = ({
  avatar,
  onClick = noop,
  className,
  style,
  title,
}) => {
  return (
    <div className={classnames(styles.avatar, className)} style={style} onClick={onClick}>
      {avatar ? (
        <Image
          src={avatar}
          alt="avatar"
          title={title}
          LoadingComponent={
            <Placeholder
              type={PlaceholderType.Circle}
              className={styles.avatarPlaceholder}
              color={PlaceholderColor.DarkPaleBlue}
            />
          }
        />
      ) : (
        <Placeholder
          type={PlaceholderType.Circle}
          className={styles.avatarPlaceholder}
          color={PlaceholderColor.DarkPaleBlue}
          animate={false}
        />
      )}
    </div>
  );
};

export default Avatar;
