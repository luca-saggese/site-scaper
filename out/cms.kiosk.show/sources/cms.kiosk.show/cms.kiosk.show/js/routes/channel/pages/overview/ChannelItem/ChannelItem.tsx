import classnames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router-dom';

import DropDown from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import Emoji from '@Components/Emoji';
import Icon, { IconSize, IconType } from '@Components/Icon';
import Placeholder, { PlaceholderType } from '@Components/Placeholder';
import ShowPreview, { Mode } from '@Components/ShowPreview';
import Typography, { TextType } from '@Components/Typography';
import { MAX_VISIBLE_SHOWS } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { ChannelListItemFragment } from '@Graphql/graphqlTypes.generated';
import ShowingOnScreenSelect from '@Routes/channel/components/ShowingOnScreenSelect';
import { formatTime } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ChannelItem.module.scss';

export interface ChannelItemProps {
  item: ChannelListItemFragment;
  onRenameOptionClick: (show: ChannelListItemFragment) => void;
  onDeleteOptionClick: (show: ChannelListItemFragment) => void;
  onDuplicateOptionClick: (show: ChannelListItemFragment) => void;
}

const ChannelItem: React.FunctionComponent<ChannelItemProps> = ({
  item,
  onRenameOptionClick,
  onDeleteOptionClick,
  onDuplicateOptionClick,
}) => {
  const t = useTranslation();
  const history = useHistory();

  const handleOnChannelClick = (id: string) => {
    history.push(RouteConfig.ChannelEdit.buildLink({ id }));
  };

  const getChannelShowsMessage = () => {
    switch (item.shows.length) {
      case 0:
        return t('msg_label_channel_no_shows');
      case 1:
        return t('msg_label_channel_shows_singular_count', { count: item.shows.length });
      default:
        return t('msg_label_channel_shows_count', { count: item.shows.length });
    }
  };

  return (
    <div className={styles.container} onClick={() => handleOnChannelClick(item.id)}>
      <div className={styles.topContainer}>
        <ShowingOnScreenSelect channelId={item.id} eventLocation="channel_overview" />
        <div className={styles.controls}>
          <Icon
            className={styles.previewIcon}
            icon={IconType.Eye}
            size={IconSize.L}
            onClick={(e) => {
              e.stopPropagation();
              history.push(RouteConfig.ChannelPreview.buildLink({ id: item.id }));
            }}
          />
          <DropDown
            component={<Icon className={styles.moreIcon} icon={IconType.More} size={IconSize.L} title="Edit channel" />}
          >
            <DropDownItem onClick={() => onRenameOptionClick(item)}>{t('msg_common_rename')}</DropDownItem>
            <DropDownItem onClick={() => onDuplicateOptionClick(item)}>{t('msg_common_duplicate')}</DropDownItem>
            <DropDownItem onClick={() => onDeleteOptionClick(item)}>{t('msg_common_delete')}</DropDownItem>
          </DropDown>
        </div>
      </div>
      <div className={styles.topContainer}>
        <Emoji backgroundColor={item.emojiBackgroundColor} code={item.emojiCode} className={styles.emoji} />
        <Typography className={styles.channelName} styleType={TextType.LargeBoldHeadline} WrapperElement="div">
          {item.name}
        </Typography>
      </div>
      <div className={styles.showPreviewContainer}>
        {item.shows.slice(0, MAX_VISIBLE_SHOWS).map((showNode, index) => (
          <ShowPreview key={`${showNode.show.id}_${index}`} item={showNode.show} mode={Mode.Small} />
        ))}
      </div>
      <div>
        <div className={styles.showsHeader}>
          <Typography styleType={TextType.TinyHeadline}>{getChannelShowsMessage()}</Typography>
          <Typography styleType={TextType.TinyHeadline}>{formatTime(item.totalDuration)}</Typography>
        </div>
        <div className={styles.showsContainer}>
          {item.shows.slice(0, MAX_VISIBLE_SHOWS).map((showNode, index) => (
            <div key={`${showNode.show.id}_${index}`} className={styles.showRow}>
              <Typography>{showNode.show.name}</Typography>
              <Typography styleType={TextType.TinyHeadline}>{formatTime(showNode.show.duration)}</Typography>
            </div>
          ))}
          {item.shows.length > MAX_VISIBLE_SHOWS && (
            <div className={styles.remainingShowsText}>
              <Typography styleType={TextType.LowerCaseLink}>
                {t('msg_label_channel_remaining_shows', { count: item.shows.length - MAX_VISIBLE_SHOWS })}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ChannelItemPlaceholder: React.FunctionComponent = () => (
  <div className={classnames(styles.container, styles.containerPlaceholder)}>
    <div className={styles.topContainer}>
      <Placeholder className={styles.namePlaceholder} />
      <Placeholder className={classnames(styles.emoji, styles.emojiPlaceholder)} type={PlaceholderType.Circle} />
    </div>
  </div>
);

export default ChannelItem;
