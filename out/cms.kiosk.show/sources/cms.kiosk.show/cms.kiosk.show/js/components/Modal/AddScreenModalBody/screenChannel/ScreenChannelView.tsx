import React, { useMemo } from 'react';
import { Waypoint } from 'react-waypoint';

import Emoji from '@Components/Emoji';
import Loader from '@Components/List/Loader';
import ShowPreview, { Mode } from '@Components/ShowPreview';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { DEFAULT_PAGE_SIZE, MAX_VISIBLE_SHOWS } from '@Config/constants';
import { ScreenFragment, useScreenChannelsQuery } from '@Graphql/graphqlTypes.generated';
import { getNodes } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ScreenChannelView.module.scss';

interface ScreenChannelViewProps {
  screen: ScreenFragment;
  onSelect: (channelId?: string) => void;
}

const ScreenChannelView: React.FunctionComponent<ScreenChannelViewProps> = ({ screen, onSelect }) => {
  const t = useTranslation();
  const { data, loading, fetchMore } = useScreenChannelsQuery({
    variables: {
      organization: screen.organization?.id,
      first: DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: 'network-only',
  });

  const loadMore = () => {
    fetchMore({
      variables: {
        organization: screen.organization?.id,
        first: DEFAULT_PAGE_SIZE,
        after: data?.channels.pageInfo.endCursor,
      },
    });
  };

  const channels = useMemo(() => getNodes(data?.channels.edges), [data]);

  return (
    <div className={styles.container}>
      <Typography className={styles.title} styleType={TextType.MediumHeadline} WrapperElement="div">
        {t('msg_add_screen_modal_channel_view_title')}
      </Typography>
      <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
        {t('msg_add_screen_modal_channel_view_subtitle')}
      </Typography>
      <div>
        {channels.map((channel) => (
          <div key={channel.id} className={styles.channel} onClick={() => onSelect(channel.id)}>
            <div className={styles.channelTopContainer}>
              <Typography className={styles.channelName} styleType={TextType.MediumHeadline} WrapperElement="div">
                {channel.name}
              </Typography>
              <Emoji
                backgroundColor={channel.emojiBackgroundColor}
                code={channel.emojiCode}
                className={styles.channelEmoji}
                emojiClassName={styles.channelEmojiImage}
              />
            </div>
            <div className={styles.channelShowPreviewContainer}>
              {channel.shows.slice(0, MAX_VISIBLE_SHOWS).map((showNode, index) => (
                <ShowPreview key={`${showNode.show.id}_${index}`} item={showNode.show} mode={Mode.Small} />
              ))}
            </div>
          </div>
        ))}
        {!loading && (
          <div className={styles.channel} onClick={() => onSelect(undefined)}>
            <Typography className={styles.channelName} styleType={TextType.MediumHeadline} WrapperElement="div">
              {t('msg_add_screen_modal_channel_view_empty_option')}
            </Typography>
          </div>
        )}
        {loading && <Loader className={styles.loader} />}
        {data?.channels.pageInfo.hasNextPage && <Waypoint onEnter={loadMore} />}
      </div>
    </div>
  );
};

export default ScreenChannelView;
