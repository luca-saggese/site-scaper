import classnames from 'classnames';
import React, { useState } from 'react';

import Badge, { BadgeColor } from '@Components/Badge';
import DropDown, { DropDownAlign } from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import SelectableOption from '@Components/DropDown/SelectableOption';
import Emoji from '@Components/Emoji';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import Typography, { TextColor, TextType } from '@Components/Typography';
import {
  ScreenListItemFragment,
  useChannelDropdownQuery,
  useScreenChangeChannelMutation,
  useScreenChangeShowMutation,
  useShowDropdownQuery,
} from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNodes, gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ScreenContentDropdown.module.scss';

enum Tab {
  Channel = 'Channel',
  Show = 'Show',
}

export interface ScreenContentDropdownProps {
  screen: ScreenListItemFragment;
}

const ScreenContentDropdown: React.FunctionComponent<ScreenContentDropdownProps> = ({ screen }) => {
  const t = useTranslation();

  const [activeTab, setActiveTab] = useState(Tab.Channel);

  const showDropdownQuery = useShowDropdownQuery({ fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first' });
  const channelDropdownQuery = useChannelDropdownQuery({ fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first' });

  const [screenChangeShowMutation] = useScreenChangeShowMutation({
    onError: mutationErrorHandler('msg_error_title_update_screen'),
  });

  const [screenChangeChannelMutation] = useScreenChangeChannelMutation({
    onError: mutationErrorHandler('msg_error_title_update_screen'),
  });

  const renderShowDropdownList = () => {
    const shows = getNodes(showDropdownQuery.data?.shows.edges);

    const onOptionClick = (showId: string, selected: boolean) => () => {
      analytics.track('screen_change_content', {
        screen_id: gqlIdToUuid(screen.id),
        subscribed_show_id: gqlIdToUuid(showId),
        action: selected ? 'deselect' : 'select',
        event_location: 'screen_overview',
      });
      screenChangeShowMutation({
        variables: {
          input: {
            id: screen.id,
            subscribedShow: selected ? null : showId,
          },
        },
      });
    };

    if (showDropdownQuery.loading) {
      return (
        <div className={styles.loadingIconContainer}>
          <Icon icon={IconType.Loading} iconStyle={IconStyle.Secondary} spin={true} />
        </div>
      );
    }

    if (!shows.length) {
      return (
        <Typography className={styles.noOptionMessage} WrapperElement="div">
          {t('msg_common_dropdown_no_options')}
        </Typography>
      );
    }

    return (
      <>
        {shows.map((show) => {
          const selected = screen.subscribedShow?.id === show.id;
          return (
            <DropDownItem key={show.id} className={styles.tabDropdownItem} onClick={onOptionClick(show.id, selected)}>
              <SelectableOption selected={selected} text={show.name} />
            </DropDownItem>
          );
        })}
      </>
    );
  };

  const renderChannelDropdownList = () => {
    const channels = getNodes(channelDropdownQuery.data?.channels.edges);

    if (channelDropdownQuery.loading) {
      return (
        <div className={styles.loadingIconContainer}>
          <Icon icon={IconType.Loading} iconStyle={IconStyle.Secondary} spin={true} />
        </div>
      );
    }

    if (!channels.length) {
      return (
        <Typography className={styles.noOptionMessage} WrapperElement="div">
          {t('msg_common_dropdown_no_options')}
        </Typography>
      );
    }

    return (
      <>
        {channels.map((channel) => {
          const selected = screen.subscribedChannel?.id === channel.id;

          const onClick = () => {
            analytics.track('screen_change_content', {
              screen_id: gqlIdToUuid(screen.id),
              subscribed_channel_id: gqlIdToUuid(channel.id),
              action: selected ? 'deselect' : 'select',
              event_location: 'screen_overview',
            });
            screenChangeChannelMutation({
              variables: {
                input: {
                  id: screen.id,
                  subscribedChannel: selected ? null : channel.id,
                },
              },
            });
          };

          return (
            <DropDownItem key={channel.id} className={styles.tabDropdownItem} onClick={onClick}>
              <SelectableOption
                selected={selected}
                text={channel.name}
                image={
                  <Emoji
                    backgroundColor="inherit"
                    code={channel.emojiCode}
                    className={styles.emoji}
                    emojiClassName={styles.image}
                  />
                }
              />
            </DropDownItem>
          );
        })}
      </>
    );
  };

  return (
    <DropDown
      align={DropDownAlign.Start}
      component={
        <Badge
          color={BadgeColor.Purple}
          className={classnames(styles.addToButton, { [styles.selectedChannel]: screen.subscribedChannel })}
        >
          {screen.subscribedChannel && (
            <Emoji
              className={styles.emoji}
              emojiClassName={styles.image}
              backgroundColor="inherit"
              code={screen.subscribedChannel.emojiCode}
            />
          )}
          <Typography styleType={TextType.LowerCaseLink}>
            {screen.subscribedChannel?.name || screen.subscribedShow?.name || t('msg_common_add_to')}
          </Typography>
        </Badge>
      }
    >
      <div className={styles.contentDropdownItem}>
        <div className={styles.tabList}>
          <Typography
            className={styles.tab}
            styleType={TextType.LowerCaseLink}
            color={activeTab === Tab.Channel ? TextColor.Blue : TextColor.LightGrey}
            onClick={() => setActiveTab(Tab.Channel)}
          >
            {t('msg_common_channel')}
          </Typography>
          <Typography
            className={styles.tab}
            styleType={TextType.LowerCaseLink}
            color={activeTab === Tab.Show ? TextColor.Blue : TextColor.LightGrey}
            onClick={() => setActiveTab(Tab.Show)}
          >
            {t('msg_common_show')}
          </Typography>
        </div>
        <div className={styles.tabContent}>
          {activeTab === Tab.Channel ? renderChannelDropdownList() : renderShowDropdownList()}
        </div>
      </div>
    </DropDown>
  );
};

export default ScreenContentDropdown;
