import React from 'react';

import Placeholder from '@Components/Placeholder';
import ShowPreview, { ShowPreviewPlaceholder } from '@Components/ShowPreview';
import Typography, { TextType } from '@Components/Typography';
import { AddShowToChannelListItemFragment } from '@Graphql/graphqlTypes.generated';

import styles from './ShowItem.module.scss';

export interface ShowItemProps {
  item: AddShowToChannelListItemFragment;
  onItemClick: (show: AddShowToChannelListItemFragment) => void;
}

const ShowItem: React.FunctionComponent<ShowItemProps> = ({ item, onItemClick }) => {
  return (
    <div className={styles.container} onClick={() => onItemClick(item)}>
      <ShowPreview item={item} />
      <div className={styles.info}>
        <Typography styleType={TextType.RegularHeadline}>{item.name}</Typography>
      </div>
    </div>
  );
};

export const ShowItemPlaceholder: React.FunctionComponent = () => (
  <div className={styles.container}>
    <ShowPreviewPlaceholder />
    <div className={styles.info}>
      <div>
        <Placeholder className={styles.showNamePlaceholder} />
      </div>
    </div>
  </div>
);

export default ShowItem;
