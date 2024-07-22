import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Button, { ButtonColor } from '@Components/Button';
import MainPageLayout from '@Components/Layout/MainPageLayout';
import MainNavigationBar from '@Components/Layout/NavigationBar/MainNavigationBar';
import List from '@Components/List';
import { useModal } from '@Components/Modal';
import AddScreenModalBody from '@Components/Modal/AddScreenModalBody';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import FormModalBody from '@Components/Modal/FormModalBody';
import NotificationModalBody from '@Components/Modal/NotificationModalBody';
import { toastInfo } from '@Components/Toastify';
import Typography, { TextType } from '@Components/Typography';
import { DEFAULT_PAGE_SIZE } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  ScreenDeviceType,
  ScreenListItemFragment,
  ScreensListDocument,
  useDeleteScreenMutation,
  useMeQuery,
  useScreensListQuery,
  useUpdateScreenMutation,
} from '@Graphql/graphqlTypes.generated';
import ScreenItem, { ScreenItemPlaceholder } from '@Routes/screen/pages/overview/ScreenItem';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNextScreenRotationValue, getNodes, gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import EmptyScreensListPanel from './EmptyScreensListPanel';
import styles from './ScreenOverviewPage.module.scss';

const ScreenOverviewPage: React.FunctionComponent = () => {
  const t = useTranslation();
  const location = useLocation();
  const { showModal, closeModal } = useModal();

  const meQuery = useMeQuery();

  const [deleteScreenMutation] = useDeleteScreenMutation();

  const [updateScreenMutation] = useUpdateScreenMutation({
    onError: mutationErrorHandler('msg_error_title_update_screen'),
  });

  const { data, loading, fetchMore, refetch } = useScreensListQuery({
    variables: {
      first: DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (location.pathname === RouteConfig.ScreenAdd.buildLink()) {
      showAddScreenModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    fetchMore({
      variables: {
        first: DEFAULT_PAGE_SIZE,
        after: data?.screens.pageInfo.endCursor,
      },
    });
  };

  const showAddScreenModal = () => {
    showModal({ component: AddScreenModalBody });
  };

  const openDeleteModal = async (screen: ScreenListItemFragment) => {
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
        content: <Typography>{t('msg_screen_delete_confirmation_text', { name: screen.name })}</Typography>,
      },
    });

    if (action !== 'CONFIRM') {
      return;
    }

    showModal({
      component: NotificationModalBody,
      props: {
        text: t('msg_common_delete_in_progress', { name: screen.name }),
      },
      closeable: false,
    });

    try {
      await deleteScreenMutation({
        variables: {
          input: {
            id: screen.id,
          },
        },
        refetchQueries: [{ query: ScreensListDocument, variables: { first: DEFAULT_PAGE_SIZE } }],
      });

      analytics.track('screen_delete', {
        screen_id: gqlIdToUuid(screen.id),
        event_location: 'screen_overview',
      });
      toastInfo('msg_common_delete_successful_text', { name: screen.name });
      closeModal();
    } catch (error) {
      mutationErrorHandler('msg_error_title_delete_screen');
      closeModal();
    }
  };

  const openRenameModal = async (screen: ScreenListItemFragment) => {
    const result = await showModal({
      component: FormModalBody,
      props: {
        title: t('msg_rename_modal_screen_title'),
        label: t('msg_rename_modal_input_label'),
        submitButtonText: t('msg_common_save'),
        value: screen.name,
      },
    });

    if (result.action !== 'CONFIRM') {
      return;
    }

    analytics.track('screen_rename', {
      screen_id: gqlIdToUuid(screen.id),
      event_location: 'screen_overview',
    });
    updateScreenMutation({
      variables: {
        input: {
          id: screen.id,
          rotation: screen.rotation,
          overscanEnabled: screen.overscanEnabled,
          isScreenInfoVisible: screen.isScreenInfoVisible,
          name: result.params,
        },
      },
    });
  };

  const rotate = (screen: ScreenListItemFragment) => {
    const rotation = getNextScreenRotationValue(screen.rotation);
    analytics.track('screen_rotate', {
      screen_id: gqlIdToUuid(screen.id),
      rotation,
      event_location: 'screen_overview',
    });
    updateScreenMutation({
      variables: {
        input: {
          id: screen.id,
          name: screen.name,
          overscanEnabled: screen.overscanEnabled,
          isScreenInfoVisible: screen.isScreenInfoVisible,
          rotation,
        },
      },
    });
  };

  const toggleScreenInfo = (screen: ScreenListItemFragment) => {
    analytics.track('screen_toggle_screen_info', {
      screen_id: gqlIdToUuid(screen.id),
      event_location: 'screen_overview',
    });
    updateScreenMutation({
      variables: {
        input: {
          id: screen.id,
          name: screen.name,
          overscanEnabled: screen.overscanEnabled,
          rotation: screen.rotation,
          isScreenInfoVisible: !screen.isScreenInfoVisible,
        },
      },
    });
  };

  const items = getNodes(data?.screens.edges);

  const firstOfflineChromecast = useMemo(() => {
    if (!window.cast) return;
    return items.find((item) => !item.isOnline && item.deviceType === ScreenDeviceType.Chromecast);
  }, [items]);

  return (
    <MainPageLayout
      gridClassName={styles.container}
      NavigationBarComponent={<MainNavigationBar />}
      limitBodyWidth={false}
    >
      <div className={styles.topContainer}>
        <Typography className={styles.pageTitle} styleType={TextType.MediumHeadline} WrapperElement="div">
          {t('msg_page_title_screen')}
        </Typography>
        <div className={styles.controls}>
          <Button onClick={showAddScreenModal}>{t('msg_add_screen')}</Button>
        </div>
      </div>
      <div className={styles.viewContainer}>
        <List
          className={styles.listContainer}
          hasNextPage={data?.screens.pageInfo.hasNextPage}
          loadMore={loadMore}
          LoadingComponent={ScreenItemPlaceholder}
          loadingItemsCount={4}
          emptyListComponent={
            <div className={styles.emptyListContainer}>
              <EmptyScreensListPanel />
            </div>
          }
          items={items}
          loading={loading}
          label="Screens"
        >
          {({ item }) => (
            <ScreenItem
              key={item.id}
              item={item}
              user={meQuery.data?.me}
              onDeleteOptionClick={openDeleteModal}
              onRenameOptionClick={openRenameModal}
              onRotateOptionClick={rotate}
              onToggleScreenInfoOptionClick={toggleScreenInfo}
              isChromecastPopoverVisible={firstOfflineChromecast && firstOfflineChromecast.id === item.id}
              refetchScreens={refetch}
            />
          )}
        </List>
      </div>
    </MainPageLayout>
  );
};

export default ScreenOverviewPage;
