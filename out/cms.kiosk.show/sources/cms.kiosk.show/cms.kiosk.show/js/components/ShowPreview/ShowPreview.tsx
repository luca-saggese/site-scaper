import classnames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

import Icon, { IconSize, IconType } from '@Components/Icon';
import Image from '@Components/Image';
import Loader from '@Components/Loader';
import Placeholder, { PlaceholderColor, PlaceholderType } from '@Components/Placeholder';
import Typography, { TextType } from '@Components/Typography';
import { SLIDE_TEMPLATE_WIDTH } from '@Config/constants';
import {
  AddShowToChannelListItemFragment,
  ChannelListItemShowFragment,
  ChannelShowFragment,
  ShowListItemFragment,
  ShowSlidePreviewImageState,
  useScreenDropdownQuery,
  useShowPreviewQuery,
} from '@Graphql/graphqlTypes.generated';
import useDimensions from '@Hooks/useDimensions';
import { useEventHandler } from '@Hooks/useEventHandler';
import { getNodes, noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ShowPreview.module.scss';

export enum Mode {
  Big = 'Big',
  Small = 'Small',
}

interface ShowPreviewProps {
  item: AddShowToChannelListItemFragment | ShowListItemFragment | ChannelShowFragment | ChannelListItemShowFragment;
  className?: string;
  onClick?: () => void;
  mode?: Mode;
}

const ShowPreview: React.FunctionComponent<ShowPreviewProps> = ({ item, className, mode = Mode.Big, onClick }) => {
  const t = useTranslation();
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

  const screenDropdownQuery = useScreenDropdownQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    skip: mode === Mode.Small,
  });

  const previewGenerating = item.previewImageState === ShowSlidePreviewImageState.Rendering;
  const showLivePreview = hovered && !previewGenerating && !!item.previewImage;

  const screenNames = getNodes(screenDropdownQuery.data?.screens.edges)
    .filter((screen) => screen.subscribedShow?.id === item.id)
    .map((screen) => screen.name);

  return (
    <div ref={ref} className={classnames(styles.container, className)} onClick={onClick}>
      {showLivePreview && <LivePreview item={item} mode={mode} containerRef={ref} />}

      {!previewGenerating && (
        <div className={classnames({ [styles.hidden]: showLivePreview })}>
          <Image className={styles.previewImage} src={item.previewImage} LoadingComponent={<ImagePlaceholder />} />
          {mode === Mode.Big && !!screenNames.length && (
            <Typography className={styles.showingOnBadge} styleType={TextType.TinyLink} WrapperElement="div">
              {screenNames.length === 1 && t('msg_showing_on_screens_single_values', { name: screenNames[0] })}
              {screenNames.length > 1 && t('msg_showing_on_screens_multiple_values', { count: screenNames.length })}
            </Typography>
          )}
          {mode === Mode.Big && !item.previewImage && (
            <Typography className={styles.emptyShowOverlay} styleType={TextType.MediumHeadline} WrapperElement="div">
              {t('msg_label_empty_show')}
            </Typography>
          )}
        </div>
      )}

      {previewGenerating &&
        (mode === Mode.Big ? (
          <div className={styles.loaderContainer}>
            <Loader className={styles.loader} iconClassName={styles.loaderIcon} />
            <Typography>{t('msg_label_generating_preview')}</Typography>
          </div>
        ) : (
          <ImagePlaceholder />
        ))}
    </div>
  );
};

const ImagePlaceholder: React.FunctionComponent = () => (
  <Placeholder className={styles.previewImage} color={PlaceholderColor.DustyDarkBlue}>
    <Placeholder className={styles.previewPlaceholderCircle} type={PlaceholderType.Circle} />
  </Placeholder>
);

interface LivePreviewProps {
  item: AddShowToChannelListItemFragment | ShowListItemFragment | ChannelShowFragment;
  mode?: Mode;
  containerRef: React.MutableRefObject<HTMLElement | null>;
}

const LivePreview: React.FunctionComponent<LivePreviewProps> = ({ item, mode = Mode.Big, containerRef }) => {
  const t = useTranslation();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const dimensions = useDimensions(containerRef);

  const { data, loading } = useShowPreviewQuery({
    variables: {
      id: item.id,
    },
    fetchPolicy: 'network-only',
  });

  const slides = useMemo(() => data?.show?.slides || [], [data]);

  useEffect(() => {
    if (!slides.length) {
      return noop;
    }

    const timerId = setTimeout(() => {
      const isLast = slideIndex === slides.length - 1;
      setSlideIndex(isLast ? 0 : slideIndex + 1);
    }, slides[slideIndex].duration * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [slideIndex, slides]);

  if (!slides.length) {
    return null;
  }

  return (
    <>
      <iframe
        className={styles.iframe}
        style={{ transform: `scale(${dimensions.width / SLIDE_TEMPLATE_WIDTH})` }}
        title="Show preview"
        frameBorder="0"
        scrolling="no"
        srcDoc={slides[slideIndex].renderedHtml}
        onLoad={() => {
          setIframeLoaded(true);
        }}
      />
      {mode === Mode.Big && (
        <Typography styleType={TextType.TinyLink} className={styles.livePreviewBadge}>
          {t('msg_label_live_preview_badge')}
        </Typography>
      )}
      {mode === Mode.Small && <div className={styles.livePreviewDot} />}
      {(!iframeLoaded || loading) && (
        <div className={styles.iframeLoading}>
          <Icon icon={IconType.Loading} spin={true} size={IconSize.XL} />
        </div>
      )}
    </>
  );
};

interface ShowPreviewPlaceholderProps {
  className?: string;
}

export const ShowPreviewPlaceholder: React.FunctionComponent<ShowPreviewPlaceholderProps> = ({ className }) => (
  <div className={classnames(styles.container, className)}>
    <ImagePlaceholder />
  </div>
);

export default ShowPreview;
