import React, { useContext, useEffect, useState } from 'react';
import WebBrowser from '../WebBrowser';
import { KioskContext } from '../../contexts/kiosk/kioskContext';
import { noop } from '../../utils/helpers';

const static_url = 'kiosk_pages/channel_static.html';
const no_shows_url = 'kiosk_pages/no_shows.html';

const ChannelViewer: React.FunctionComponent = () => {
  const { currentChannel, currentShow } = useContext(KioskContext);

  const [{ currentIndex, prerenderIndex }, setState] = useState<{
    currentIndex: number;
    prerenderIndex: number | undefined;
  }>({
    currentIndex: 0,
    prerenderIndex: undefined,
  });
  const [slides, setSlides] = useState<{ duration: number; renderedHtml: string }[]>([]);
  const [isChangeAnimationVisible, setIsChangeAnimationVisible] = useState(true);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    setIsChangeAnimationVisible(true);
    setState({ currentIndex: 0, prerenderIndex: undefined });

    if (currentChannel) {
      setSlides(currentChannel.shows.flatMap((showNode) => showNode.show.slides));
    } else if (currentShow) {
      setSlides(currentShow.slides);
    } else {
      setSlides([]);
    }

    const timerId = setTimeout(() => {
      setIsChangeAnimationVisible(false);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentChannel, currentShow]);

  // When we only have 1 slide
  useEffect(() => {
    if (slides.length === 1) {
      const intervalId = setInterval(() => {
        setForceRender((prev) => !prev);
      }, slides[currentIndex].duration * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [slides, currentIndex]);

  // When we have more than one slide
  useEffect(() => {
    if (slides.length < 2) {
      return noop;
    }

    const isLast = currentIndex === slides.length - 1;
    const nextIndex = isLast ? 0 : currentIndex + 1;
    const slideDuration = slides[currentIndex].duration * 1000;

    const timerId = setTimeout(() => {
      setState({ currentIndex: nextIndex, prerenderIndex: undefined });
    }, slideDuration);

    const prerenderTimerId = setTimeout(() => {
      setState({ currentIndex, prerenderIndex: nextIndex });
    }, slideDuration - 500);

    return () => {
      clearTimeout(timerId);
      clearTimeout(prerenderTimerId);
    };
  }, [slides, currentIndex]);

  if (isChangeAnimationVisible) {
    return <WebBrowser url={static_url} />;
  }

  if (!slides.length) {
    return <WebBrowser url={no_shows_url} />;
  }

  if (slides.length === 1) {
    return <WebBrowser key={String(forceRender)} html={slides[0].renderedHtml} />;
  }

  return (
    <>
      <WebBrowser key={currentIndex} html={slides[currentIndex].renderedHtml} />
      {prerenderIndex && <WebBrowser key={prerenderIndex} html={slides[prerenderIndex].renderedHtml} />}
    </>
  );
};

export default ChannelViewer;
