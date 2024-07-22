import classnames from 'classnames';
import React, { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { KioskContext } from '../../contexts/kiosk/kioskContext';
import { useScaleView } from '../../hooks/useScaleView';
import styles from './ScreenSharingPage.module.scss';

const ScreenSharingPage: React.FunctionComponent = () => {
  const history = useHistory();
  useScaleView();

  const videoRef = useRef<HTMLVideoElement>(null);

  const state = useContext(KioskContext);

  useEffect(() => {
    if (state.videoStream && videoRef.current) {
      videoRef.current.srcObject = state.videoStream;
    } else {
      history.push('/');
    }
  }, [state.videoStream, history]);

  return (
    <div className={classnames(styles.screensharingPage)}>
      <video height="100%" width="100%" ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default ScreenSharingPage;
