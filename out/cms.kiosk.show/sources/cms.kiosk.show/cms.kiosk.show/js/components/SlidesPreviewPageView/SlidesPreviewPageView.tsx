import classnames from 'classnames';
import React, { useState } from 'react';

import Icon, { IconStyle, IconType } from '@Components/Icon';
import SlidesPreview from '@Components/SlidesPreview';
import { ScreenRotation } from '@Graphql/graphqlTypes.generated';
import { noop } from '@Utils/helpers';

import styles from './SlidesPreviewPageView.module.scss';

interface ShowPreviewViewProps {
  defaultRotation?: ScreenRotation;
  slides: { renderedHtml: string; duration: number }[];
  onClose: () => void;
  onRotationChange?: (isHorizontal: boolean) => void;
}

const SlidesPreviewPageView: React.FunctionComponent<ShowPreviewViewProps> = ({
  defaultRotation = ScreenRotation.Rotation_0,
  slides,
  onClose,
  onRotationChange = noop,
}) => {
  const [isHorizontal, setIsHorizontal] = useState(
    [ScreenRotation.Rotation_0, ScreenRotation.Rotation_180].includes(defaultRotation)
  );

  return (
    <div>
      <SlidesPreview
        slides={slides}
        isHorizontal={isHorizontal}
        containerWidth={window.innerWidth}
        containerHeight={window.innerHeight}
      />
      <div className={styles.actionsContainer}>
        <div
          className={classnames(styles.horizontalIconContainer, {
            [styles.active]: isHorizontal,
          })}
          onClick={() => {
            setIsHorizontal(true);
            onRotationChange(true);
          }}
        >
          <div className={styles.horizontalIcon} />
        </div>
        <div
          className={classnames(styles.verticalIconContainer, {
            [styles.active]: !isHorizontal,
          })}
          onClick={() => {
            setIsHorizontal(false);
            onRotationChange(false);
          }}
        >
          <div className={styles.verticalIcon} />
        </div>
        <div className={styles.closeIcon} onClick={onClose}>
          <Icon icon={IconType.Close} iconStyle={IconStyle.None} />
        </div>
      </div>
    </div>
  );
};

export default SlidesPreviewPageView;
