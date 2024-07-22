import React, { useContext } from 'react';
import styles from './WebBrowser.module.scss';
import { KioskContext } from '../../contexts/kiosk/kioskContext';
import { ScreenRotation } from '../../graphql/graphqlTypes.generated';
import { HEIGHT, WIDTH } from '../../config/constants';

interface WebBrowserProps {
  html?: string;
  url?: string;
}

function WebBrowser({ url = 'kiosk_pages/no_data.html', html = undefined }: WebBrowserProps) {
  const { screen } = useContext(KioskContext);

  const isHorizontal =
    screen?.rotation === ScreenRotation.Rotation_0 || screen?.rotation === ScreenRotation.Rotation_180;

  return (
    <div className={styles.webBrowser}>
      <div className={styles.overlay} />
      <iframe
        key={screen?.rotation}
        {...(html ? { srcDoc: html } : { src: url })}
        title="KioskViewer"
        className={styles.webBrowserIframe}
        style={{
          width: `${isHorizontal ? WIDTH : HEIGHT}px`,
          height: `${isHorizontal ? HEIGHT : WIDTH}px`,
        }}
        frameBorder="0"
        scrolling="no"
      />
    </div>
  );
}

export default WebBrowser;
