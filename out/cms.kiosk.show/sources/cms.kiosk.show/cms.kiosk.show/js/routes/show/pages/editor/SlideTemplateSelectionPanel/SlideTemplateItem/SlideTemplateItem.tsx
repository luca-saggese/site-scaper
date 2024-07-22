import classnames from 'classnames';
import React, { useState } from 'react';

import Icon, { IconSize, IconType } from '@Components/Icon';
import Image from '@Components/Image';
import Placeholder, { PlaceholderColor, PlaceholderType } from '@Components/Placeholder';
import Typography, { TextType } from '@Components/Typography';
import { SLIDE_TEMPLATE_WIDTH } from '@Config/constants';
import { SlideTemplateFragment } from '@Graphql/graphqlTypes.generated';
import useDimensions from '@Hooks/useDimensions';
import { useEventHandler } from '@Hooks/useEventHandler';
import { useTranslation } from '@Utils/i18n';

import styles from './SlideTemplateItem.module.scss';

interface SlideTemplateItemProps {
  item: SlideTemplateFragment;
  onClick: () => void;
}

const SlideTemplateItem: React.FunctionComponent<SlideTemplateItemProps> = ({ item, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useEventHandler(
    'mouseover',
    () => {
      setHovered(true);
    },
    () => {
      setHovered(false);
    }
  );

  return (
    <div className={styles.container} onClick={onClick}>
      <div ref={ref} className={styles.preview}>
        {hovered && <LivePreview previewUrl={item.previewUrl} containerRef={ref} />}
        <Image
          className={classnames(styles.previewImage, { [styles.hidden]: hovered })}
          src={item.cover}
          LoadingComponent={
            <Placeholder className={styles.previewImage} color={PlaceholderColor.DustyDarkBlue}>
              <Placeholder className={styles.previewPlaceholderCircle} type={PlaceholderType.Circle} />
            </Placeholder>
          }
        />
      </div>

      <div className={styles.infoContainer}>
        <Typography styleType={TextType.RegularHeadline} WrapperElement="div">
          {item.name}
        </Typography>
      </div>
    </div>
  );
};

interface LivePreviewProps {
  previewUrl: string;
  containerRef: React.MutableRefObject<HTMLElement | null>;
}

const LivePreview: React.FunctionComponent<LivePreviewProps> = ({ previewUrl, containerRef }) => {
  const t = useTranslation();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const dimensions = useDimensions(containerRef);

  return (
    <>
      <iframe
        className={styles.iframe}
        style={{ transform: `scale(${dimensions.width / SLIDE_TEMPLATE_WIDTH})` }}
        title="Template preview"
        frameBorder="0"
        scrolling="no"
        src={previewUrl}
        onLoad={() => {
          setIframeLoaded(true);
        }}
      />
      <Typography styleType={TextType.TinyLink} className={styles.livePreviewBadge}>
        {t('msg_label_live_preview_badge')}
      </Typography>
      {!iframeLoaded && (
        <div className={styles.iframeLoading}>
          <Icon icon={IconType.Loading} spin={true} size={IconSize.XL} />
        </div>
      )}
    </>
  );
};

export const SlideTemplateItemPlaceholder: React.FunctionComponent = () => (
  <div className={styles.container}>
    <div className={styles.preview}>
      <Placeholder className={styles.previewImage} color={PlaceholderColor.DustyDarkBlue}>
        <Placeholder className={styles.previewPlaceholderCircle} type={PlaceholderType.Circle} />
      </Placeholder>
    </div>
    <div className={styles.infoContainer}>
      <Placeholder className={styles.namePlaceholder} />
    </div>
  </div>
);

export default SlideTemplateItem;
