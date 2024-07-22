import Pusher, { Channel } from 'pusher-js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Peer from 'simple-peer';

import Icon, { IconSize, IconStyle, IconType } from '@Components/Icon';
import { toastError } from '@Components/Toastify';
import config from '@Config/config';
import { EventType } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { useNetworkTransversalCredentialQuery } from '@Graphql/graphqlTypes.generated';
import { useRouteParams } from '@Hooks/useRouteParams';
import { logError, logInfo, noop } from '@Utils/helpers';

import styles from './ScreenSharing.module.scss';

async function startCapture() {
  const displayMediaOptions = {
    video: {
      cursor: 'always',
    },
    audio: false,
  };

  return navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
}

function stopCapture(stream?: MediaStream) {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}

const ScreenSharingPage: React.FunctionComponent = () => {
  const history = useHistory();
  const { id } = useRouteParams(RouteConfig.ScreenChannel);
  const video = useRef<HTMLVideoElement>(null);

  const [videoStream, setVideoStream] = useState<MediaStream>();
  const [pusherChannel, setPusherChannel] = useState<Channel>();
  const tvPeer = useRef<Peer.Instance>();

  const { data } = useNetworkTransversalCredentialQuery({ fetchPolicy: 'network-only' });

  const iceServers = data?.networkTransversalCredential?.iceServers;

  // Compute device id
  const deviceNodeId = useMemo(() => {
    const uuid = atob(id).split(':').pop();
    return btoa(`DeviceNode:${uuid}`);
  }, [id]);

  const getVideo = useCallback(async () => {
    try {
      const myStream = await startCapture();
      if (myStream && video.current) {
        setVideoStream(myStream);
        video.current.srcObject = myStream;
      }
    } catch (error) {
      history.push(RouteConfig.Screens.buildLink());
    }
  }, [setVideoStream, history]);

  const startWebRTC = useCallback(async () => {
    if (videoStream) {
      logInfo('Loading WebRTC peer');
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {
          iceServers,
        },
        stream: videoStream,
      });

      // todo message names
      pusherChannel?.bind(EventType.WebRtcAccept, (data: any) => {
        peer.signal(data);
      });

      // Triggered on initial handhake
      peer.on('signal', (data) => {
        pusherChannel?.trigger(EventType.WebRtcStart, data);
        logInfo(data);
      });

      // Triggered when connection drops unexpectedly
      peer.on('error', (err) => {
        logError(err.message);
        history.push(RouteConfig.Screens.buildLink());
        toastError('msg_screenshare_error_title', 'msg_screenshare_error_text');
      });

      // Triggered when connection is ended on purpose by the other peer
      peer.on('end', () => {
        history.push(RouteConfig.Screens.buildLink());
      });

      // Triggered when connection is closed by the peer
      // e.g. Tab close
      peer.on('close', () => {
        history.push(RouteConfig.Screens.buildLink());
      });

      // Triggered when video stream is stopped
      // e.g. when you use the google chrome sharing popup, not the navigation
      // It's an array because media streams can have
      // multiple audio, video tracks on the same stream
      videoStream.getTracks().forEach((track) => {
        function listener() {
          history.push(RouteConfig.Screens.buildLink());
          track.removeEventListener('ended', listener);
        }

        track.addEventListener('ended', listener);
      });

      tvPeer.current = peer;
    }
  }, [videoStream, iceServers, pusherChannel, history]);

  // Call tv client and cleanup after
  useEffect(() => {
    if (!iceServers) {
      return;
    }

    startWebRTC();
    return () => {
      stopCapture(videoStream);
    };
  }, [videoStream, startWebRTC, iceServers]);

  // Clean up webrtc peer when navigating away
  useEffect(() => {
    return () => {
      if (tvPeer.current) {
        logInfo('Closing webrtc peer: ', tvPeer);
        tvPeer.current.destroy();
      }
    };
  }, [tvPeer, pusherChannel]);

  // On page load: start video stream
  useEffect(() => {
    getVideo();
  }, [getVideo]);

  // On page load: start pusher client
  useEffect(() => {
    if (!deviceNodeId) return noop;

    const channelName = `private-${deviceNodeId}`;

    const pusher = new Pusher(config.REACT_APP_PUSHER_APP_KEY, {
      cluster: config.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: config.REACT_APP_PUSHER_AUTH_URL,
      auth: {
        headers: {
          'X-DEVICE-AUTHORIZATION': deviceNodeId,
        },
      },
    });

    pusher.connection.bind('error', (err: any) => {
      logError(`Pusher error ${JSON.stringify(err.error ? err.error : err)}`);
    });

    const channel = pusher.subscribe(channelName);

    channel.bind('pusher:subscription_succeeded', () => {
      setPusherChannel(channel);
    });

    return () => {
      channel.trigger(EventType.WebRtcEnd, {});
      setTimeout(() => {
        // Allow the message to be triggered before disconnecting
        pusher.disconnect();
      });
    };
  }, [deviceNodeId]);

  return (
    <div className={styles.screensharingPage}>
      <Icon
        className={styles.icon}
        icon={IconType.Close}
        size={IconSize.XL}
        iconStyle={IconStyle.Secondary}
        onClick={() => {
          history.push(RouteConfig.Screens.buildLink());
        }}
      />
      <video className={styles.video} ref={video} autoPlay playsInline muted />
    </div>
  );
};

export default ScreenSharingPage;
