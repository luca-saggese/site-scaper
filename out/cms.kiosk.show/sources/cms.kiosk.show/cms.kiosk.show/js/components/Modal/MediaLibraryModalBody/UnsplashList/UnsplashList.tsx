import queryString from 'query-string';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';

import MediaLibraryItem, {
  MediaLibraryItemPlaceholder,
} from '@Components/Modal/MediaLibraryModalBody/MediaLibraryItem';
import Typography, { TextType } from '@Components/Typography';
import { UNSPLASH_PAGE_LIMIT } from '@Config/constants';
import {
  ApiMediaSearchDocument,
  ApiMediaSearchQuery,
  ApiMediaSearchQueryVariables,
  SourceType,
} from '@Graphql/graphqlTypes.generated';
import graphqlClient from '@Utils/graphqlClient';
import { times } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './UnsplashList.module.scss';

const initialState = {
  loading: true,
  items: [],
  pagination: {
    page: 1,
  },
};

export interface UnsplashImage {
  id: string;
  links: {
    download_location: string;
  };
  urls: {
    small: string;
    raw: string;
  };
  user: {
    username: string;
    name: string;
  };
}

interface Data {
  loading: boolean;
  items: UnsplashImage[];
  pagination: {
    page: number;
  };
}

interface UnsplashListProps {
  searchText: string;
  onItemSelect: (item: UnsplashImage) => void;
}

const UnsplashList: FunctionComponent<UnsplashListProps> = ({ searchText, onItemSelect }) => {
  const t = useTranslation();
  const [data, setData] = useState<Data>(initialState);
  const [selected, setSelected] = useState<UnsplashImage['id']>();

  const fetchImages = useCallback(
    async (options: { page: number; per_page: number }) => {
      const query = searchText
        ? `https://api.unsplash.com/search/photos?${queryString.stringify({ query: searchText, ...options })}`
        : `https://api.unsplash.com/photos?${queryString.stringify(options)}`;

      const response = await graphqlClient.query<ApiMediaSearchQuery, ApiMediaSearchQueryVariables>({
        query: ApiMediaSearchDocument,
        variables: {
          source: SourceType.Unsplash,
          query,
        },
      });

      const parsedResponse = JSON.parse(response.data.apiMediaSearch);
      return (searchText ? parsedResponse.results : parsedResponse) as UnsplashImage[];
    },
    [searchText]
  );

  useEffect(() => {
    fetchImages({ page: 1, per_page: UNSPLASH_PAGE_LIMIT }).then((response) => {
      setData({
        loading: false,
        items: response,
        pagination: {
          page: 1,
        },
      });
    });
  }, [fetchImages]);

  const loadMore = async () => {
    setData((prevState) => ({ ...prevState, loading: true }));
    const response = await fetchImages({ page: data.pagination.page + 1, per_page: UNSPLASH_PAGE_LIMIT });
    setData((prevState) => ({
      loading: false,
      items: [...prevState.items, ...response],
      pagination: {
        page: data.pagination.page + 1,
      },
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
          src={item.urls.small}
          className={styles.item}
          onClick={() => {
            setSelected(item.id);
            onItemSelect(item);
          }}
        >
          <div className={styles.bottomSection} onClick={(event) => event.stopPropagation()}>
            <a
              href={`https://unsplash.com/@${item.user.username}?utm_source=kiosk&utm_medium=referral`}
              target="_blank"
              rel="noreferrer"
            >
              <Typography styleType={TextType.TinyLink} className={styles.author}>
                {item.user.name}
              </Typography>
            </a>
          </div>
        </MediaLibraryItem>
      ))}
      {data.loading && times(8).map((key) => <MediaLibraryItemPlaceholder key={key} />)}
      {!data.loading && <Waypoint onEnter={loadMore} />}
    </>
  );
};

export default UnsplashList;
