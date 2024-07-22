import classnames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { HIDE_REMOTE_DELAY } from '../../config/constants';
import ChannelViewer from './../../components/ChannelViewer';
import Logo from './../../components/Logo/Logo';
import { ToastContainer } from 'react-toastify';
import { toastifyConfig } from '../../components/Toastify';

import styles from './HomePage.module.scss';
import { KioskContext } from '../../contexts/kiosk/kioskContext';
import ChannelMissingView from './channelMissing';
import ScreenBlockedView from './screenBlocked';
import RegisterView from './register';
import { View } from '../../contexts/kiosk/kioskReducer';
import OverscanView from './overscan';
import { useScaleView } from '../../hooks/useScaleView';
import { DeviceFragment } from '../../graphql/graphqlTypes.generated';

const getCurrentTime = () => new Date().toTimeString().substr(0, 5);

interface ScreenInfoProps {
  screen: DeviceFragment;
}

const ScreenInfo = ({ screen }: ScreenInfoProps) => {
  const [time, setTime] = useState(getCurrentTime);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(getCurrentTime()), 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.screenNameContainer}>
      <img src={screen.organization?.avatar} className={styles.organizationLogo} alt="Organization logo" />
      <div className={styles.infoBlock}>
        <div className={styles.screenTime}>{time}</div>
        <div className={styles.screenName}>{screen?.name}</div>
      </div>
    </div>
  );
};

const HomePage: React.FunctionComponent = () => {
  const [showLogo, setShowLogo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useScaleView();
  const { screen, screenBlocked, activeView } = useContext(KioskContext);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    const refNode = ref?.current;
    const handleOnMouseEvent = () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      setShowLogo(true);
      timerId = setTimeout(() => {
        setShowLogo(false);
      }, HIDE_REMOTE_DELAY);
    };
    if (refNode) {
      refNode.addEventListener('mousemove', handleOnMouseEvent);
      refNode.addEventListener('click', handleOnMouseEvent);
    }
    return () => {
      clearTimeout(timerId);
      if (refNode) {
        refNode.removeEventListener('mousemove', handleOnMouseEvent);
        refNode.removeEventListener('click', handleOnMouseEvent);
      }
    };
  }, []);

  const renderContent = () => {
    if (screenBlocked) {
      return <ScreenBlockedView />;
    }

    if (!screen) {
      return null;
    }

    if (!screen.organization) {
      return <RegisterView />;
    }

    if (activeView === View.Overscan) {
      return <OverscanView />;
    }

    if (!screen.subscribedChannel && !screen.subscribedShow) {
      return <ChannelMissingView />;
    }

    return (
      <div className={styles.appContent}>
        <ChannelViewer />
        <div className={classnames(styles.showLogo, { [styles.showLogoVisible]: showLogo })}>
          <Logo />
        </div>
      </div>
    );
  };

  return (
    <div className={classnames(styles.app, { [styles.noCursor]: !showLogo })} ref={ref}>
      {renderContent()}
      {screen && screen.organization && screen.isScreenInfoVisible && <ScreenInfo screen={screen} />}
      <ToastContainer {...toastifyConfig} />
    </div>
  );
};

export default HomePage;
