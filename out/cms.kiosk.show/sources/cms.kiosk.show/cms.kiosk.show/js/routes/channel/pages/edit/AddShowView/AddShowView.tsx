import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';

import MainPageLayout from '@Components/Layout/MainPageLayout';
import NavigationBarClose from '@Components/Layout/NavigationBar/components/NavigationBarClose';
import NavigationBarPageDetails from '@Components/Layout/NavigationBar/components/NavigationBarPageDetails';
import FormNavigationBar from '@Components/Layout/NavigationBar/FormNavigationBar';
import ShowsFilter, {
  accessToValue,
  defaultShowFilterVariables,
  onScreenToValue,
  ShowsFilterVariables,
} from '@Components/ShowsFilter';
import Typography, { TextType } from '@Components/Typography';
import { DEFAULT_DELAY_MS, DEFAULT_PAGE_SIZE } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  AddShowToChannelListItemFragment,
  useAddShowViewToChannelQuery,
  useCreateShowMutation,
} from '@Graphql/graphqlTypes.generated';
import { useDebounce } from '@Hooks/useDebounce';
import CreateShowItem from '@Routes/channel/pages/edit/AddShowView/CreateShowItem';
import ShowItem, { ShowItemPlaceholder } from '@Routes/channel/pages/edit/AddShowView/ShowItem';
import { assertIsDefined } from '@Utils/assert';
import { getNodes, times } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './AddShowView.module.scss';

interface AddShowViewProps {
  channelId: string;
  onShowSelect: (show: AddShowToChannelListItemFragment) => void;
}

const AddShowView: React.FunctionComponent<AddShowViewProps> = ({ channelId, onShowSelect }) => {
  const t = useTranslation();
  const history = useHistory();

  const [filterValues, setFilterValues] = useState<ShowsFilterVariables>({
    ...defaultShowFilterVariables,
  });

  const debouncedFilterValues = useDebounce(filterValues, DEFAULT_DELAY_MS);

  const variables = useMemo(
    () => ({
      first: DEFAULT_PAGE_SIZE,
      name: debouncedFilterValues.search || undefined,
      orderby: (debouncedFilterValues?.orderBy && [debouncedFilterValues.orderBy]) || undefined,
      channelIds: (debouncedFilterValues?.channel && [debouncedFilterValues.channel]) || undefined,
      onScreen: onScreenToValue(debouncedFilterValues.onScreen),
      isPublic: accessToValue(debouncedFilterValues.access),
      createdBy: debouncedFilterValues?.createdBy || undefined,
      updatedBy: debouncedFilterValues?.updatedBy || undefined,
    }),
    [debouncedFilterValues]
  );

  const { data, loading, fetchMore } = useAddShowViewToChannelQuery({ variables, fetchPolicy: 'network-only' });

  const [createShowMutation] = useCreateShowMutation({
    onCompleted: (response) => {
      const showId = response.createShow.show?.id;
      assertIsDefined(showId);
      history.replace(RouteConfig.ChannelShowEditor.buildLink({ id: showId, channelId }));
    },
  });

  const loadMore = () => {
    fetchMore({
      variables: {
        after: data?.shows.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const items = getNodes(data?.shows.edges);

  const onCreateShowClick = () => {
    createShowMutation({ variables: { input: { name: 'Untitled show', channels: [channelId] } } });
  };

  return (
    <MainPageLayout
      NavigationBarComponent={
        <FormNavigationBar>
          <div className={styles.navigationFields}>
            <NavigationBarPageDetails pageDetails={t('msg_nav_channel_editor')} />
            <NavigationBarClose title={t('msg_close_channel_editor_title')} onClose={() => history.goBack()} />
          </div>
        </FormNavigationBar>
      }
      gridClassName={styles.container}
    >
      <div className={styles.leftSideContainer}>
        <div className={styles.topContainer}>
          <Typography className={styles.pageTitle} styleType={TextType.MediumHeadline}>
            {t('msg_label_channel_add_show_view_title')}
          </Typography>
        </div>
        <div className={styles.listContainer}>
          <CreateShowItem onClick={onCreateShowClick} />
          {loading && times(8).map((key) => <ShowItemPlaceholder key={key} />)}
          {items.map((item) => (
            <ShowItem key={item.id} item={item} onItemClick={onShowSelect} />
          ))}
          {data?.shows.pageInfo.hasNextPage && <Waypoint onEnter={loadMore} />}
        </div>
      </div>
      <div className={styles.filterContainer}>
        <ShowsFilter onVariablesChange={setFilterValues} variables={filterValues} className={styles.showsFilter} />
      </div>
    </MainPageLayout>
  );
};

export default AddShowView;
