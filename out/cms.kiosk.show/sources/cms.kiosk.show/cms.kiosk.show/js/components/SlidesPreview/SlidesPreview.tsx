import React, { useEffect, useState } from 'react';

import Typography, { TextType } from '@Components/Typography';
import { SLIDE_TEMPLATE_HEIGHT, SLIDE_TEMPLATE_WIDTH } from '@Config/constants';
import { noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './SlidesPreview.module.scss';

interface ShowPreviewViewProps {
  isHorizontal?: boolean;
  slides: { renderedHtml: string; duration: number }[];
  containerWidth: number;
  containerHeight: number;
}

const SlidesPreview: React.FunctionComponent<ShowPreviewViewProps> = ({
  isHorizontal = true,
  slides,
  containerWidth,
  containerHeight,
}) => {
  const t = useTranslation();
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return noop;

    function onKeyUp(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        setSlideIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
      }

      if (e.key === 'ArrowRight') {
        setSlideIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
      }
    }
    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) return noop;

    const timerId = setTimeout(() => {
      const isLast = slideIndex === slides.length - 1;
      setSlideIndex(isLast ? 0 : slideIndex + 1);
    }, slides[slideIndex].duration * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [slideIndex, slides]);

  const activeSlide = slides[slideIndex];

  const width = isHorizontal ? SLIDE_TEMPLATE_WIDTH : SLIDE_TEMPLATE_HEIGHT;
  const height = isHorizontal ? SLIDE_TEMPLATE_HEIGHT : SLIDE_TEMPLATE_WIDTH;

  if (!activeSlide) {
    return (
      <Typography styleType={TextType.Body} className={styles.noShowsMessage}>
        {t('msg_label_channel_edit_page_no_shows_message')}
      </Typography>
    );
  }
  return (
    <div
      className={styles.iframeContainer}
      style={{
        transform: `translate(-50%, -50%) scale(${Math.min(
          (containerWidth || 0) / width,
          (containerHeight || 0) / height
        )})`,
      }}
    >
      <iframe
        key={String(isHorizontal)}
        className={styles.iframe}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        title="Preview"
        frameBorder="0"
        scrolling="no"
        srcDoc={activeSlide.renderedHtml}
      />
    </div>
  );
};

export default SlidesPreview;
