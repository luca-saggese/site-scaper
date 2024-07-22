import { IGif } from '@giphy/js-types';
import queryString from 'query-string';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';

import MediaLibraryItem, {
  MediaLibraryItemPlaceholder,
} from '@Components/Modal/MediaLibraryModalBody/MediaLibraryItem';
import Typography from '@Components/Typography';
import { GIPHY_PAGE_LIMIT } from '@Config/constants';
import {
  ApiMediaSearchDocument,
  ApiMediaSearchQuery,
  ApiMediaSearchQueryVariables,
  SourceType,
} from '@Graphql/graphqlTypes.generated';
import graphqlClient from '@Utils/graphqlClient';
import { times } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './GiphyList.module.scss';

const initialState = {
  loading: true,
  items: [],
  pagination: {
    total_count: 0,
    offset: 0,
    count: 0,
  },
};

interface Data {
  loading: boolean;
  items: IGif[];
  pagination: {
    total_count: number;
    offset: number;
    count: number;
  };
}

interface GiphyListProps {
  searchText: string;
  onItemSelect: (item: IGif) => void;
}

const GiphyList: FunctionComponent<GiphyListProps> = ({ searchText, onItemSelect }) => {
  const t = useTranslation();
  const [data, setData] = useState<Data>(initialState);
  const [selected, setSelected] = useState<IGif['id']>();

  const fetchImages = useCallback(
    async (options: { limit: number; offset: number }) => {
      const query = searchText
        ? `https://api.giphy.com/v1/gifs/search?${queryString.stringify({ q: searchText, ...options })}`
        : `https://api.giphy.com/v1/gifs/trending?${queryString.stringify(options)}`;

      const result = await graphqlClient.query<ApiMediaSearchQuery, ApiMediaSearchQueryVariables>({
        query: ApiMediaSearchDocument,
        variables: {
          source: SourceType.Giphy,
          query,
        },
      });
      return JSON.parse(result.data.apiMediaSearch) as { data: Data['items']; pagination: Data['pagination'] };
    },
    [searchText]
  );

  useEffect(() => {
    fetchImages({ limit: GIPHY_PAGE_LIMIT, offset: 0 }).then((response) => {
      setData({ loading: false, items: response.data, pagination: response.pagination });
    });
  }, [fetchImages]);

  const loadMore = async () => {
    setData((prevState) => ({ ...prevState, loading: true }));
    const response = await fetchImages({ limit: GIPHY_PAGE_LIMIT, offset: data.pagination.offset + GIPHY_PAGE_LIMIT });
    setData((prevState) => ({
      loading: false,
      items: [...prevState.items, ...response.data],
      pagination: response.pagination,
    }));
  };

  if (!data.loading && !data.items.length) {
    return (
      <Typography className={styles.noItemsMessage}>{t('msg_label_no_images_matching_search_message')}</Typography>
    );
  }

  return (
    <>
      {data.items.map((item) => (
        <MediaLibraryItem
          key={item.id}
          highlighted={selected === item.id}
          src={item.images.downsized.url}
          onClick={() => {
            setSelected(item.id);
            onItemSelect(item);
          }}
        />
      ))}
      {data.loading && times(8).map((key) => <MediaLibraryItemPlaceholder key={key} />)}
      {data.pagination.total_count !== data.pagination.offset && !data.loading && <Waypoint onEnter={loadMore} />}
    </>
  );
};

export default GiphyList;
