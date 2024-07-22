import {
  ChannelFragment,
  DeviceContentFragment,
  DeviceFragment,
  Maybe,
  PublicScreenFragment,
  ScreenRotation,
  ShowFragment,
} from '../../graphql/graphqlTypes.generated';

export enum View {
  Overscan = 'OVERSCAN',
}

export type State = {
  currentChannel?: Maybe<ChannelFragment>;
  currentShow?: Maybe<ShowFragment>;
  device?: PublicScreenFragment;
  screen?: DeviceFragment;
  screenBlocked: boolean;
  activeView?: View;
  videoStream?: MediaStream;
};

export type Action =
  | {
      type: 'UpdateDeviceContent';
      payload: Maybe<DeviceContentFragment> | undefined;
    }
  | {
      type: 'UpdateDevice';
      payload: PublicScreenFragment;
    }
  | {
      type: 'UpdateScreen';
      payload: DeviceFragment;
    }
  | {
      type: 'BlockScreen';
      payload: {};
    }
  | {
      type: 'ChangeActiveView';
      payload: { view: View | undefined };
    }
  | {
      type: 'ChangeRotation';
      payload: { rotation: ScreenRotation };
    }
  | {
      type: 'SetVideoStream';
      payload: MediaStream | undefined;
    };

export default function kioskReducer(state: State, action: Action): State {
  console.log('action: ', action.type, ' : ', action.payload);

  switch (action.type) {
    case 'UpdateDeviceContent':
      return {
        ...state,
        currentChannel: action.payload?.subscribedChannel,
        currentShow: action.payload?.subscribedShow,
      };
    case 'UpdateDevice':
      return {
        ...state,
        device: action.payload,
      };
    case 'UpdateScreen':
      return {
        ...state,
        screen: action.payload,
        screenBlocked: false,
      };
    case 'BlockScreen':
      return {
        ...state,
        screenBlocked: true,
      };
    case 'ChangeActiveView':
      return {
        ...state,
        activeView: action.payload.view,
      };
    case 'ChangeRotation':
      const { screen } = state;

      if (!screen) {
        return state;
      }

      return {
        ...state,
        screen: {
          ...screen,
          rotation: action.payload.rotation,
        },
      };
    case 'SetVideoStream':
      return {
        ...state,
        videoStream: action.payload,
      };
    default:
      return state;
  }
}
