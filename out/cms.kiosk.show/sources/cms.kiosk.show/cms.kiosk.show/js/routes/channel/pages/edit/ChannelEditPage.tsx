import equal from 'fast-deep-equal';
import arrayMutators from 'final-form-arrays';
import React, { useEffect, useMemo, useRef } from 'react';
import { Form, FormSpy, FormSpyRenderProps } from 'react-final-form';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { toastError } from '@Components/Toastify';
import { LocalStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  ChannelFragment,
  ChannelShowFragment,
  SlidePreviewImageDocument,
  SlidePreviewImageSubscription,
  SlidePreviewImageSubscriptionVariables,
  useChannelQuery,
  useUpdateChannelMutation,
} from '@Graphql/graphqlTypes.generated';
import usePrevious from '@Hooks/usePrevious';
import { useRouteParams } from '@Hooks/useRouteParams';
import AddShowView from '@Routes/channel/pages/edit/AddShowView';
import ChannelPreviewView from '@Routes/channel/pages/edit/ChannelPreviewView';
import EditChannelView from '@Routes/channel/pages/edit/EditChannelView';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { mutationErrorHandler } from '@Utils/graphql';
import { gqlIdToUuid } from '@Utils/helpers';
import { getFromLocalStorage } from '@Utils/localStorage';

import styles from './ChannelEditPage.module.scss';

enum View {
  Main = 'MAIN',
  AddShow = 'ADD_SHOW',
  Preview = 'PREVIEW',
}

export interface ChannelEditFormValues {
  name: ChannelFragment['name'];
  emoji: {
    backgroundColor: ChannelFragment['emojiBackgroundColor'];
    code: ChannelFragment['emojiCode'];
  };
  shows: ChannelShowFragment[];
}

interface ChannelEditPageProps {
  channel: ChannelFragment;
}

const ChannelEditPage: React.FunctionComponent<ChannelEditPageProps> = ({ channel }) => {
  const history = useHistory();
  const location = useLocation();

  const activeView = new URLSearchParams(location.search).get('view') || View.Main;

  const [updateChannel] = useUpdateChannelMutation({
    onError: mutationErrorHandler('msg_error_title_saving_channel'),
  });

  const onSubmitHandler = (values: ChannelEditFormValues) => {
    return updateChannel({
      variables: {
        input: {
          id: channel.id,
          name: values.name,
          emojiBackgroundColor: values.emoji.backgroundColor,
          emojiCode: values.emoji.code,
          shows: values.shows.map((show) => show.id),
        },
      },
    });
  };

  const handleAddShowClick = () => {
    history.push({ search: `?view=${View.AddShow}` });
  };

  const handleChannelPreviewClick = () => {
    history.push({ search: `?view=${View.Preview}` });
  };

  const initialValues = useMemo(
    () => ({
      name: channel.name,
      emoji: {
        backgroundColor: channel.emojiBackgroundColor,
        code: channel.emojiCode,
      },
      shows: channel.shows.map((showNode) => showNode.show),
    }),
    [channel]
  );

  return (
    <Form<ChannelEditFormValues>
      onSubmit={onSubmitHandler}
      mutators={{
        ...arrayMutators,
      }}
      initialValues={initialValues}
      render={(formProps) => (
        <form onSubmit={formProps.handleSubmit} className={styles.form}>
          <FormSpy<ChannelEditFormValues> subscription={{ active: true, values: true, errors: true }}>
            {(props) => <AutoSave {...props} id={channel.id} update={() => formProps.form.submit()} />}
          </FormSpy>
          {activeView === View.AddShow && (
            <AddShowView
              channelId={channel.id}
              onShowSelect={(show) => {
                analytics.track('channel_shows_add', {
                  channel_id: gqlIdToUuid(channel.id),
                  show_id: gqlIdToUuid(show.id),
                  event_location: 'channel_editor',
                });
                formProps.form.mutators.push('shows', show);
                history.replace({ search: '' });
              }}
            />
          )}
          {activeView === View.Preview && (
            <ChannelPreviewView
              id={channel.id}
              eventLocation="channel_editor"
              onClose={() => {
                history.replace({ search: '' });
              }}
            />
          )}
          {activeView === View.Main && (
            <EditChannelView
              channel={channel}
              formProps={formProps}
              onAddShowClick={handleAddShowClick}
              onChannelPreviewClick={handleChannelPreviewClick}
            />
          )}
        </form>
      )}
    />
  );
};

interface AutosaveInterface extends FormSpyRenderProps<ChannelEditFormValues> {
  update: () => void;
  id: string;
}

const AutoSave: React.FunctionComponent<AutosaveInterface> = ({ id, active, values, errors, update }) => {
  const previousActive = usePrevious(active);
  const showsOrder = values.shows.map((show) => show.id);
  const previousShowsOrder = usePrevious(showsOrder);
  const oldValues = useRef(values);

  useEffect(() => {
    if (active || !previousActive || equal(values, oldValues.current)) {
      return;
    }

    oldValues.current = values;

    if (previousActive === 'emoji') {
      analytics.track('channel_change_avatar', {
        channel_id: gqlIdToUuid(id),
        event_location: 'channel_editor',
      });
    } else if (previousActive === 'name') {
      analytics.track('channel_rename', {
        channel_id: gqlIdToUuid(id),
        event_location: 'channel_editor',
      });
    }
    update();
  }, [active, errors, id, previousActive, update, values]);

  useEffect(() => {
    if (previousShowsOrder && String(showsOrder) !== String(previousShowsOrder)) {
      update();
    }
  }, [previousShowsOrder, showsOrder, update]);

  return null;
};

const ChannelEditPageContainer: React.FunctionComponent = () => {
  const { id } = useRouteParams(RouteConfig.ChannelEdit);

  const { loading, data, error, subscribeToMore } = useChannelQuery({
    variables: { id },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const token = getFromLocalStorage(LocalStorage.UserToken);
    assertIsDefined(token);

    const unsubscribe = subscribeToMore<SlidePreviewImageSubscription, SlidePreviewImageSubscriptionVariables>({
      document: SlidePreviewImageDocument,
      variables: { input: { token } },
    });
    return unsubscribe;
  }, [subscribeToMore]);

  if (loading) {
    return null;
  }

  if (error || !data?.channel) {
    toastError('msg_error_title_channel', 'msg_error_loading_channel');
    return <Redirect to={RouteConfig.Channels.buildLink()} />;
  }

  return <ChannelEditPage channel={data.channel} />;
};

export default ChannelEditPageContainer;
