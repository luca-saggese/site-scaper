import React, { createContext, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import axios from 'axios';
import logger from '../../utils/logger';
import Peer, { SignalData } from 'simple-peer';

import KioskReducer, { State, View } from './kioskReducer';
import {
  ScreenRotation,
  useDeviceContentQuery,
  useDeviceQuery,
  useNetworkTransversalCredentialQuery,
  useRegisterDeviceMutation,
} from '../../graphql/graphqlTypes.generated';
import store from '../../utils/store';
import { APP_CONFIG } from '../../utils/globalKiosk';
import { toastError } from '../../components/Toastify';
import { getDeviceType, noop } from '../../utils/helpers';
import usePrevious from '../../hooks/usePrevious';
import { PusherError } from '../../config/pusher';
import Pusher from 'pusher-js';
import { EventType, Links } from '../../config/constants';
import { useHistory } from 'react-router-dom';
import { useTranslation } from '../../utils/i18n';

export const KioskContext = createContext<State>({
  currentChannel: undefined,
  currentShow: undefined,
  device: undefined,
  screen: undefined,
  screenBlocked: false,
  activeView: undefined,
  videoStream: undefined,
});

export const KioskProvider: React.FunctionComponent = ({ children }) => {
  const history = useHistory();

  const [state, dispatch] = useReducer(KioskReducer, { screenBlocked: false });
  const t = useTranslation();

  const [currentEtag, setCurrentEtag] = useState('');
  const [pusherClient, setPusherClient] = useState<Pusher>();
  const cmsPeer = useRef<Peer.Instance>();

  // Set the current etag
  useEffect(() => {
    axios.head('/').then((response) => {
      setCurrentEtag(response.headers.etag);
    });
  }, []);

  const deviceNodeId = state.device?.deviceNodeId;

  // Configure pusher client
  useEffect(() => {
    if (deviceNodeId) {
      const pusher = new Pusher(APP_CONFIG.pusherAppKey, {
        cluster: APP_CONFIG.pusherCluster,
        authEndpoint: APP_CONFIG.pusherAuthUrl,
        auth: {
          headers: {
            'X-DEVICE-AUTHORIZATION': deviceNodeId,
          },
        },
      });

      pusher.connection.bind('error', (err: PusherError) => {
        if (err && err.error?.data?.code === 1006) return;
        logger.error(`Pusher error ${JSON.stringify(err.error ? err.error : err)}`);
      });

      setPusherClient(pusher);
    }
  }, [deviceNodeId]);

  // Get device content data and update the store
  const { refetch: refetchDeviceContent } = useDeviceContentQuery({
    variables: {
      id: deviceNodeId || '',
    },
    context: {
      headers: {
        'X-device-authorization': deviceNodeId,
      },
    },
    skip: !deviceNodeId,
    onCompleted: (data) => {
      if (!data) return; // skip condition triggered

      dispatch({
        type: 'UpdateDeviceContent',
        payload: data.device,
      });
    },
    onError: () => {
      toastError(t('msg_tv_channel_query_error_title'), t('msg_tv_channel_query_error'));
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const { refetch: refetchDevice } = useDeviceQuery({
    variables: {
      id: deviceNodeId || '',
    },
    context: {
      headers: {
        'X-device-authorization': deviceNodeId,
      },
    },
    skip: !deviceNodeId,
    onCompleted: (data) => {
      if (!data?.device) {
        // skip condition triggered
        return;
      }

      if (
        data.device.subscribedChannel?.id !== state.screen?.subscribedChannel?.id ||
        data.device.subscribedShow?.id !== state.screen?.subscribedShow?.id
      ) {
        refetchDeviceContent();
      }

      if (APP_CONFIG.isElectron) {
        document.kiosk.ipcRenderer.send('DEVICE_UPDATE', JSON.stringify(data.device));
      }

      dispatch({
        type: 'UpdateScreen',
        payload: data.device,
      });
    },
    onError: (error) => {
      const firstError = error.graphQLErrors[0];

      if (firstError?.message === 'error_screens_blocked') {
        dispatch({ type: 'BlockScreen', payload: {} });
        return;
      }

      toastError(t('msg_tv_device_query_error_title'), t('msg_tv_device_query_error'));
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const networkTransversalCredentialQuery = useNetworkTransversalCredentialQuery({
    context: {
      headers: {
        'X-device-authorization': deviceNodeId,
      },
    },
    skip: !deviceNodeId,
    fetchPolicy: 'network-only',
  });

  const iceServers = networkTransversalCredentialQuery.data?.networkTransversalCredential?.iceServers;

  const [registerDevice] = useRegisterDeviceMutation({
    onCompleted: (data) => {
      const { device } = data.registerDevice;

      if (!device) {
        return;
      }

      dispatch({
        type: 'UpdateDevice',
        payload: device,
      });

      store.set('deviceId', device.id);
    },
    onError: (error) => {
      if (error.graphQLErrors?.[0]?.message !== 'error_screen_was_deleted') {
        toastError(t('msg_tv_register_device_query_error_title'), t('msg_tv_register_device_query_error'));
      }

      if (error.networkError) {
        setTimeout(() => {
          triggerDeviceRegistration();
        }, 10000);
        return;
      }
      store.delete('deviceId');
      triggerDeviceRegistration();
    },
  });

  const triggerDeviceRegistration = useCallback(() => {
    registerDevice({
      variables: {
        input: {
          deviceType: getDeviceType(),
          deviceId: store.get('deviceId'),
          uniqueMachineId: APP_CONFIG.machineId,
          appVersion: APP_CONFIG.appVersion,
          tvAppVersion: APP_CONFIG.tvAppVersion,
          osInfo: APP_CONFIG.osInfo,
        },
      },
    });
  }, [registerDevice]);

  // Subscribe to Screen updates
  useEffect(() => {
    if (!deviceNodeId || !pusherClient) return noop;

    const channel = pusherClient.subscribe(deviceNodeId);

    channel.bind(EventType.UpdateScreen, () => {
      refetchDevice();
    });

    channel.bind(EventType.DeleteScreen, () => {
      store.delete('deviceId');
      triggerDeviceRegistration();
    });

    channel.bind(EventType.ChangeView, (payload: { view: View | undefined }) => {
      dispatch({ type: 'ChangeActiveView', payload });
    });

    channel.bind(EventType.ChangeRotation, (payload: { rotation: ScreenRotation }) => {
      dispatch({ type: 'ChangeRotation', payload });
    });

    return () => {
      channel.unbind();
      pusherClient.unsubscribe(deviceNodeId);
    };
  }, [deviceNodeId, refetchDevice, triggerDeviceRegistration, pusherClient]);

  // Subscribe to WebRTC
  useEffect(() => {
    if (!deviceNodeId || !pusherClient) return noop;

    const channelName = `private-${deviceNodeId}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind(EventType.WebRtcStart, (data: SignalData) => {
      const peer = new Peer({
        config: {
          iceServers,
        },
        trickle: false,
        initiator: false,
      });

      // Triggered on initial handshake
      peer.on('signal', (data) => {
        channel.trigger(EventType.WebRtcAccept, data);
      });

      // Triggered when connection drops unexpectedly
      peer.on('error', (err) => {
        dispatch({ type: 'SetVideoStream', payload: undefined });
        history.push(Links.Home);
      });

      // Triggered when connection is ended on purpose by the other peer
      peer.on('end', () => {
        dispatch({ type: 'SetVideoStream', payload: undefined });
        history.push(Links.Home);
      });

      // Triggered when connection is closed by the peer
      // e.g. Tab close
      peer.on('close', () => {
        dispatch({ type: 'SetVideoStream', payload: undefined });
        history.push(Links.Home);
      });

      // Triggered when video stream starts
      peer.on('stream', (stream) => {
        dispatch({ type: 'SetVideoStream', payload: stream });
        history.push(Links.Screensharing);
      });

      // Send back the handshake response
      peer.signal(data);

      cmsPeer.current = peer;
    });

    channel.bind(EventType.WebRtcEnd, () => {
      cmsPeer.current?.destroy();
      history.push(Links.Home);
    });

    return () => {
      channel.unbind();
      pusherClient.unsubscribe(channelName);
    };
  }, [deviceNodeId, pusherClient, history, iceServers]);

  const organizationId = state.screen?.organization?.id;

  // Subscribe to Organisation Presence Channel
  useEffect(() => {
    if (!organizationId || !pusherClient) return noop;

    pusherClient.subscribe(`presence-${organizationId}`);

    return () => {
      pusherClient.unsubscribe(`presence-${organizationId}`);
    };
  }, [organizationId, pusherClient]);

  const channelId = state.screen?.subscribedChannel?.id;

  // Subscribe to Channel Updates
  useEffect(() => {
    if (!channelId || !pusherClient) return noop;

    const channel = pusherClient.subscribe(channelId);

    channel.bind(EventType.UpdateChannel, () => {
      refetchDeviceContent();
    });

    return () => {
      channel.unbind();
      pusherClient.unsubscribe(channelId);
    };
  }, [channelId, refetchDeviceContent, pusherClient]);

  const showIds = useMemo(() => {
    if (state.currentChannel) {
      return state.currentChannel.shows.map((showNode) => showNode.show.id);
    }

    if (state.currentShow) {
      return [state.currentShow.id];
    }

    return [];
  }, [state.currentChannel, state.currentShow]);

  const previousShowIds = usePrevious(showIds);

  // Check if a show has been added or removed
  useEffect(() => {
    if (!pusherClient) return noop;

    const addedShowIds = previousShowIds ? showIds.filter((id) => !previousShowIds.includes(id)) : showIds;
    const removedShowIds = previousShowIds ? previousShowIds.filter((id) => !showIds.includes(id)) : [];

    addedShowIds.forEach((id) => {
      const channel = pusherClient.subscribe(id);

      channel.bind(EventType.UpdateShow, () => {
        refetchDeviceContent();
      });
    });

    removedShowIds.forEach((id) => {
      if (pusherClient.channel(id)) {
        pusherClient.channel(id).unbind();
        pusherClient.unsubscribe(id);
      }
    });
  }, [previousShowIds, refetchDeviceContent, showIds, pusherClient]);

  useEffect(() => {
    triggerDeviceRegistration();
  }, [triggerDeviceRegistration]);

  // Listen for global events
  useEffect(() => {
    if (!pusherClient) return noop;

    const channel = pusherClient.subscribe('GLOBAL');

    channel.bind(EventType.NewVersionRelease, () => {
      setInterval(async () => {
        const result = await axios.head('/');
        if (currentEtag !== result.headers.etag) {
          window.location.reload();
        }
      }, 3 * 1000);

      // If etag has not changed in 5 minutes (for unknown reasons), just trigger reload anyway
      setTimeout(() => {
        window.location.reload();
      }, 5 * 60 * 1000);
    });

    channel.bind(EventType.ReloadTvClient, () => {
      window.location.reload();
    });

    return () => {
      channel.unbind();
      pusherClient.unsubscribe('GLOBAL');
    };
  }, [currentEtag, pusherClient]);

  return <KioskContext.Provider value={state}>{children}</KioskContext.Provider>;
};
