import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import Button, { ButtonColor } from '@Components/Button';
import ContentBox from '@Components/Layout/ContentBox/ContentBox';
import MainPageLayout from '@Components/Layout/MainPageLayout';
import MainNavigationBar from '@Components/Layout/NavigationBar/MainNavigationBar';
import List from '@Components/List';
import { useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import FormModalBody from '@Components/Modal/FormModalBody';
import NotificationModalBody from '@Components/Modal/NotificationModalBody';
import ShowsFilter, {
  AccessFilterValue,
  accessToValue,
  defaultShowFilterVariables,
  LiveStatusFilterValue,
  onScreenToValue,
} from '@Components/ShowsFilter';
import { toastInfo } from '@Components/Toastify';
import Typography, { TextType } from '@Components/Typography';
import { DEFAULT_DELAY_MS, DEFAULT_PAGE_SIZE, LocalStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  ShowListItemFragment,
  ShowsListDocument,
  ShowsListQueryVariables,
  SlidePreviewImageDocument,
  SlidePreviewImageSubscription,
  SlidePreviewImageSubscriptionVariables,
  useCreateShowMutation,
  useDeleteShowMutation,
  useDuplicateShowMutation,
  useMeQuery,
  useShowsListQuery,
  useUpdateShowMutation,
} from '@Graphql/graphqlTypes.generated';
import { useDebounce } from '@Hooks/useDebounce';
import ShowItem, { ShowItemPlaceholder } from '@Routes/show/pages/overview/ShowItem';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNodes, gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';
import { getFromLocalStorage } from '@Utils/localStorage';
import { getEnumParam } from '@Utils/query-string';

import styles from './ShowOverviewPage.module.scss';

const LiveStatusArrayParam = getEnumParam(LiveStatusFilterValue);
const AccessFilterArrayParam = getEnumParam(AccessFilterValue);

const ShowOverviewPage: React.FunctionComponent = () => {
  const t = useTranslation();
  const history = useHistory();
  const { showModal, closeModal } = useModal();

  const [query, setQuery] = useQueryParams({
    search: withDefault(StringParam, defaultShowFilterVariables.search),
    orderBy: withDefault(StringParam, defaultShowFilterVariables.orderBy),
    channel: withDefault(StringParam, defaultShowFilterVariables.channel),
    createdBy: withDefault(StringParam, defaultShowFilterVariables.createdBy),
    updatedBy: withDefault(StringParam, defaultShowFilterVariables.updatedBy),
    onScreen: withDefault(LiveStatusArrayParam, defaultShowFilterVariables.onScreen),
    access: withDefault(AccessFilterArrayParam, defaultShowFilterVariables.access),
  });

  const debouncedFilterValues = useDebounce(query, DEFAULT_DELAY_MS);

  const variables = useMemo<ShowsListQueryVariables>(
    () => ({
      first: DEFAULT_PAGE_SIZE,
      name: debouncedFilterValues.search || undefined,
      orderby: (debouncedFilterValues.orderBy && [debouncedFilterValues.orderBy]) || undefined,
      channelIds: (debouncedFilterValues?.channel && [debouncedFilterValues.channel]) || undefined,
      onScreen: onScreenToValue(debouncedFilterValues.onScreen),
      isPublic: accessToValue(debouncedFilterValues.access),
      createdBy: debouncedFilterValues?.createdBy || undefined,
      updatedBy: debouncedFilterValues?.updatedBy || undefined,
    }),
    [debouncedFilterValues]
  );

  const meQuery = useMeQuery();

  const [deleteShowMutation] = useDeleteShowMutation();

  const [duplicateShowMutation] = useDuplicateShowMutation({
    onError: mutationErrorHandler('msg_error_title_duplicate_show'),
  });

  const [updateShowMutation] = useUpdateShowMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
  });

  const [createShowMutation] = useCreateShowMutation({
    onCompleted: (response) => {
      const showId = response.createShow.show?.id;
      assertIsDefined(showId);
      analytics.track('show_create', {
        show_id: gqlIdToUuid(showId),
        event_location: 'show_overview',
      });
      history.replace({
        pathname: RouteConfig.ShowEditor.buildLink({ id: showId }),
        search: `?showCreated=true`,
      });
    },
  });

  const handleOnCreateShow = () => {
    createShowMutation({ variables: { input: { name: 'Untitled show', channels: [] } } });
  };

  const activeFilter = variables.name || variables.orderby || variables.channelIds;

  const { data, loading, fetchMore, subscribeToMore, refetch } = useShowsListQuery({
    variables,
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

  const loadMore = () => {
    fetchMore({
      variables: {
        after: data?.shows.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const openDeleteModal = async (show: ShowListItemFragment) => {
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
        content: <Typography>{t('msg_common_delete_confirmation_text', { name: show.name })}</Typography>,
      },
    });

    if (action !== 'CONFIRM') {
      return;
    }

    showModal({
      component: NotificationModalBody,
      props: {
        text: t('msg_common_delete_in_progress', { name: show.name }),
      },
      closeable: false,
    });

    try {
      analytics.track('show_delete', {
        show_id: gqlIdToUuid(show.id),
        event_location: 'show_overview',
      });
      await deleteShowMutation({
        variables: {
          input: {
            id: show.id,
          },
        },
      });

      await refetch(variables);

      toastInfo('msg_common_delete_successful_text', { name: show.name });
      closeModal();
    } catch (error) {
      mutationErrorHandler('msg_error_title_delete_show');
      closeModal();
    }
  };

  const openRenameModal = async (show: ShowListItemFragment) => {
    const result = await showModal({
      component: FormModalBody,
      props: {
        title: t('msg_rename_modal_show_title'),
        label: t('msg_rename_modal_input_label'),
        submitButtonText: t('msg_common_save'),
        value: show.name,
      },
    });

    if (result.action !== 'CONFIRM') {
      return;
    }

    analytics.track('show_rename', {
      show_id: gqlIdToUuid(show.id),
      event_location: 'show_overview',
    });
    updateShowMutation({
      variables: {
        input: {
          id: show.id,
          name: result.params,
        },
      },
    });
  };

  const duplicateShow = (show: ShowListItemFragment) => {
    analytics.track('show_duplicate', {
      show_id: gqlIdToUuid(show.id),
      event_location: 'show_overview',
    });
    duplicateShowMutation({
      variables: {
        input: {
          showId: show.id,
        },
      },
      refetchQueries: [{ query: ShowsListDocument, variables }],
    });
  };

  const items = getNodes(data?.shows.edges);

  return (
    <MainPageLayout
      gridClassName={styles.container}
      NavigationBarComponent={<MainNavigationBar />}
      limitBodyWidth={false}
    >
      <div className={styles.topContainer}>
        <Typography className={styles.pageTitle} styleType={TextType.MediumHeadline}>
          {t('msg_label_shows_filter')}
        </Typography>
        <div className={styles.controls}>
          <Button onClick={handleOnCreateShow}>{t('msg_label_create_show')}</Button>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <ShowsFilter variables={query} onVariablesChange={setQuery} />
      </div>
      <div className={styles.viewContainer}>
        <List
          className={styles.listContainer}
          hasNextPage={data?.shows.pageInfo.hasNextPage}
          loadMore={loadMore}
          LoadingComponent={ShowItemPlaceholder}
          loadingItemsCount={6}
          emptyListComponent={
            <ContentBox>
              <Typography>
                {activeFilter ? t('msg_label_empty_show_list_with_search') : t('msg_label_empty_show_list')}
              </Typography>
            </ContentBox>
          }
          items={items}
          loading={loading}
          label="Shows"
        >
          {({ item }) => {
            return (
              <ShowItem
                key={item.id}
                item={item}
                user={meQuery.data?.me}
                onRenameOptionClick={openRenameModal}
                onDeleteOptionClick={openDeleteModal}
                onDuplicateOptionClick={duplicateShow}
              />
            );
          }}
        </List>
      </div>
    </MainPageLayout>
  );
};

export default ShowOverviewPage;
