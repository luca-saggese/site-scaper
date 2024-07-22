import React, { ReactNode } from 'react';
import { Waypoint } from 'react-waypoint';

import Loader from '@Components/List/Loader';
import { noop, times } from '@Utils/helpers';
import { AnyObject } from '@Utils/types';

import styles from './List.module.scss';

interface ListItemProps<T> {
  item: T;
  index: number;
}

export interface ListProps<T> {
  className?: string;
  items?: T[];
  hasNextPage?: boolean;
  loadMore?: () => void;
  emptyListComponent: React.ReactNode;
  componentProps?: AnyObject;
  loading?: boolean;
  LoadingComponent: React.FunctionComponent;
  loadingItemsCount: number;
  children: (listItemProps: ListItemProps<T>) => ReactNode;
  label: string;
}

const List = <T extends AnyObject>({
  className,
  items = [],
  hasNextPage = false,
  loadMore = noop,
  emptyListComponent,
  children,
  loading,
  LoadingComponent,
  loadingItemsCount,
  label,
}: ListProps<T>) => {
  if (loading) {
    return (
      <ul className={className}>
        {times(loadingItemsCount).map((key) => (
          <li>
            <LoadingComponent key={key} />
          </li>
        ))}
      </ul>
    );
  }

  if (!items.length) {
    return <>{emptyListComponent}</>;
  }

  return (
    <ul className={className} aria-label={label}>
      {items.map((item, index) => {
        return <li>{children({ item, index })}</li>;
      })}
      {hasNextPage && (
        <div className={styles.loader}>
          <Waypoint onEnter={loadMore} />
          <Loader />
        </div>
      )}
    </ul>
  );
};

export default List;
