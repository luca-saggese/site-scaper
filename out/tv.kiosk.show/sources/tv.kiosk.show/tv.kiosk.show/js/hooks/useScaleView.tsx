import { useContext, useLayoutEffect } from 'react';
import { debounce } from 'debounce';
import { KioskContext } from '../contexts/kiosk/kioskContext';
import { ScreenRotation } from '../graphql/graphqlTypes.generated';
import { HEIGHT, WIDTH } from '../config/constants';

const rotationMap = {
  [ScreenRotation.Rotation_0]: 0,
  [ScreenRotation.Rotation_90]: 90,
  [ScreenRotation.Rotation_180]: 180,
  [ScreenRotation.Rotation_270]: 270,
} as const;

export const useScaleView = () => {
  const { screen } = useContext(KioskContext);
  const rotation = screen?.rotation || ScreenRotation.Rotation_0;

  useLayoutEffect(() => {
    function scaleView() {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      const widthRatio = currentWidth / WIDTH;
      const heightRatio = currentHeight / HEIGHT;
      const ratio = Math.min(widthRatio, heightRatio);

      const isHorizontal = rotation === ScreenRotation.Rotation_0 || rotation === ScreenRotation.Rotation_180;

      document.body.style.position = 'absolute';
      document.body.style.transformOrigin = 'center center';
      document.body.style.transform = `rotate(${rotationMap[rotation]}deg) scale(${ratio})`;
      document.body.style.width = `${isHorizontal ? WIDTH : HEIGHT}px`;
      document.body.style.height = `${isHorizontal ? HEIGHT : WIDTH}px`;
      document.body.style.top = '50%';
      document.body.style.left = '50%';

      document.body.style.marginLeft = `-${isHorizontal ? WIDTH / 2 : HEIGHT / 2}px`;
      document.body.style.marginTop = `-${isHorizontal ? HEIGHT / 2 : WIDTH / 2}px`;
    }

    const fn = debounce(scaleView, 200);
    window.addEventListener('resize', fn);

    scaleView();

    return () => {
      window.removeEventListener('resize', fn);

      document.body.style.transformOrigin = '';
      document.body.style.transform = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [rotation]);
};
