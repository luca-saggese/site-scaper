import classnames from 'classnames';
import React from 'react';

import Icon, { IconStyle, IconType } from '@Components/Icon';
import Image from '@Components/Image';
import Placeholder, { PlaceholderColor, PlaceholderType } from '@Components/Placeholder';

import styles from './MediaLibraryItem.module.scss';

export interface MediaLibraryItemProps {
  src: string;
  className?: string;
  highlighted?: boolean;
  onClick: () => void;
  onDeleteClick?: () => void;
}

const MediaLibraryItem: React.FunctionComponent<MediaLibraryItemProps> = ({
  src,
  className,
  highlighted = false,
  onClick,
  onDeleteClick,
  children,
}) => {
  return (
    <button
      className={classnames(styles.container, className, { [styles.highlighted]: highlighted })}
      onClick={() => onClick()}
    >
      <Image
        className={styles.preview}
        src={src}
        LoadingComponent={
          <Placeholder className={styles.previewPlaceholder} color={PlaceholderColor.VeryLightGrey}>
            <Placeholder
              className={styles.previewPlaceholderCircle}
              color={PlaceholderColor.LightGrey}
              type={PlaceholderType.Circle}
            />
          </Placeholder>
        }
      />
      {onDeleteClick && (
        <div
          className={styles.removeIcon}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteClick();
          }}
        >
          <Icon icon={IconType.Trash} iconStyle={IconStyle.None} />
        </div>
      )}

      {children}
    </button>
  );
};

export const MediaLibraryItemPlaceholder: React.FunctionComponent = () => (
  <div className={styles.container}>
    <Placeholder className={styles.previewPlaceholder} color={PlaceholderColor.VeryLightGrey}>
      <Placeholder
        className={styles.previewPlaceholderCircle}
        color={PlaceholderColor.LightGrey}
        type={PlaceholderType.Circle}
      />
    </Placeholder>
  </div>
);

export default MediaLibraryItem;
