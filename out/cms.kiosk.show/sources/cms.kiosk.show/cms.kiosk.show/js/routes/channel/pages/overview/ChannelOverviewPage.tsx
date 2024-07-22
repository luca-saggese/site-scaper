import React from 'react';
import { useHistory } from 'react-router-dom';

import Button, { ButtonColor } from '@Components/Button';
import ContentBox from '@Components/Layout/ContentBox/ContentBox';
import MainPageLayout from '@Components/Layout/MainPageLayout';
import MainNavigationBar from '@Components/Layout/NavigationBar/MainNavigationBar';
import List from '@Components/List';
import { useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import FormModalBody from '@Components/Modal/FormModalBody';
import NotificationModalBody from '@Components/Modal/NotificationModalBody';
import { toastInfo } from '@Components/Toastify';
import Typography, { TextType } from '@Components/Typography';
import { DEFAULT_PAGE_SIZE } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  ChannelListItemFragment,
  ShowsListDocument,
  useChannelsListQuery,
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useDuplicateChannelMutation,
  useUpdateChannelMutation,
} from '@Graphql/graphqlTypes.generated';
import ChannelItem, { ChannelItemPlaceholder } from '@Routes/channel/pages/overview/ChannelItem';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { EmojiList } from '@Utils/emoji';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNodes, gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';
import { randomHex, randomValue } from '@Utils/random';

import styles from './ChannelOverviewPage.module.scss';

const ChannelOverviewPage: React.FunctionComponent = () => {
  const t = useTranslation();
  const history = useHistory();
  const { showModal, closeModal } = useModal();

  const [createChannelMutation] = useCreateChannelMutation({
    onCompleted: (response) => {
      const id = response.createChannel.channel?.id;
      assertIsDefined(id);
      analytics.track('channel_create', {
        channel_id: gqlIdToUuid(id),
        event_location: 'channel_overview',
      });
      history.replace(RouteConfig.ChannelEdit.buildLink({ id }));
    },
  });

  const [updateChannelMutation] = useUpdateChannelMutation({
    onError: mutationErrorHandler('msg_error_title_saving_channel'),
  });

  const [deleteChannelMutation] = useDeleteChannelMutation({
    onError: mutationErrorHandler('msg_error_title_saving_channel'),
  });

  const [duplicateChannelMutation] = useDuplicateChannelMutation({
    onError: mutationErrorHandler('msg_error_title_saving_channel'),
  });

  const handleOnCreateChannel = () => {
    createChannelMutation({
      variables: {
        input: { name: 'Untitled channel', emojiBackgroundColor: randomHex(), emojiCode: randomValue(EmojiList).code },
      },
    });
  };

  const { data, loading, fetchMore, refetch } = useChannelsListQuery({
    variables: {
      first: DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: 'network-only',
  });

  const loadMore = () => {
    fetchMore({
      variables: {
        first: DEFAULT_PAGE_SIZE,
        after: data?.channels.pageInfo.endCursor,
      },
    });
  };

  const openDeleteModal = async (channel: ChannelListItemFragment) => {
    const { action } = await showModal({
      component: ConfirmationModalBody,
      props: {
        confirmButton: {
          color: ButtonColor.Red,
          label: t('msg_common_delete'),
        },
        cancelButton: {
          color: ButtonColor.Black,
          label: t('msg_common_cancel'),
        },
        content: <Typography>{t('msg_common_delete_confirmation_text', { name: channel.name })}</Typography>,
      },
    });

    if (action !== 'CONFIRM') {
      return;
    }

    showModal({
      component: NotificationModalBody,
      props: {
        text: t('msg_common_delete_in_progress', { name: channel.name }),
      },
      closeable: false,
    });

    try {
      analytics.track('channel_delete', {
        channel_id: gqlIdToUuid(channel.id),
        event_location: 'channel_overview',
      });
      await deleteChannelMutation({
        variables: {
          input: {
            id: channel.id,
          },
        },
      });

      await refetch();

      toastInfo('msg_common_delete_successful_text', { name: channel.name });
      closeModal();
    } catch (error) {
      mutationErrorHandler('msg_error_title_delete_show');
      closeModal();
    }
  };

  const openRenameModal = async (channel: ChannelListItemFragment) => {
    const result = await showModal({
      component: FormModalBody,
      props: {
        title: t('msg_rename_modal_channel_title'),
        label: t('msg_rename_modal_input_label'),
        submitButtonText: t('msg_common_save'),
        value: channel.name,
      },
    });

    if (result.action !== 'CONFIRM') {
      return;
    }

    analytics.track('channel_rename', {
      channel_id: gqlIdToUuid(channel.id),
      event_location: 'channel_overview',
    });
    await updateChannelMutation({
      variables: {
        input: {
          id: channel.id,
          shows: channel.shows.map((showNode) => showNode.show.id),
          name: result.params,
        },
      },
    });

    await refetch();
  };

  const duplicateChannel = (channel: ChannelListItemFragment) => {
    analytics.track('channel_duplicate', {
      channel_id: gqlIdToUuid(channel.id),
      event_location: 'channel_overview',
    });
    duplicateChannelMutation({
      variables: {
        input: {
          channelId: channel.id,
        },
      },
      refetchQueries: [{ query: ShowsListDocument }],
    });
  };

  const items = getNodes(data?.channels.edges);

  return (
    <MainPageLayout
      NavigationBarComponent={<MainNavigationBar />}
      gridClassName={styles.container}
      limitBodyWidth={false}
    >
      <div className={styles.topContainer}>
        <Typography className={styles.pageTitle} styleType={TextType.MediumHeadline}>
          {t('msg_page_title_channel')}
        </Typography>
        <div className={styles.controls}>
          <Button onClick={handleOnCreateChannel}>{t('msg_label_create_channel')}</Button>
        </div>
      </div>
      <div className={styles.viewContainer}>
        <List
          className={styles.listContainer}
          hasNextPage={data?.channels.pageInfo.hasNextPage}
          LoadingComponent={ChannelItemPlaceholder}
          loadingItemsCount={9}
          loadMore={loadMore}
          emptyListComponent={
            <ContentBox>
              <Typography>{t('msg_label_empty_channel_list')}</Typography>
            </ContentBox>
          }
          items={items}
          loading={loading}
          label="Channels"
        >
          {({ item }) => (
            <ChannelItem
              key={item.id}
              item={item}
              onRenameOptionClick={openRenameModal}
              onDeleteOptionClick={openDeleteModal}
              onDuplicateOptionClick={duplicateChannel}
            />
          )}
        </List>
      </div>
    </MainPageLayout>
  );
};

export default ChannelOverviewPage;
