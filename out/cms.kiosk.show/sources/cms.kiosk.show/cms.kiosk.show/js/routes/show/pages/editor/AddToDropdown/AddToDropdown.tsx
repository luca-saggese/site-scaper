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
  ScreenDropdownItemFragment,
  useChannelDropdownQuery,
  useScreenChangeShowMutation,
  useScreenDropdownQuery,
  useUpdateChannelMutation,
} from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNodes, gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './AddToDropdown.module.scss';

enum Tab {
  Channel = 'Channel',
  Screen = 'Screen',
}

export interface ChannelSelectProps {
  showId: string;
  align?: DropDownAlign;
  eventLocation: 'show_editor' | 'show_overview';
  title?: string;
}

const AddToDropdown: React.FunctionComponent<ChannelSelectProps> = ({
  showId,
  align = DropDownAlign.End,
  eventLocation,
  title,
}) => {
  const t = useTranslation();

  const [activeTab, setActiveTab] = useState(Tab.Channel);

  const screenDropdownQuery = useScreenDropdownQuery({ fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first' });
  const channelDropdownQuery = useChannelDropdownQuery({ fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first' });

  const [screenChangeShowMutation, screenChangeShowMutationResult] = useScreenChangeShowMutation({
    onError: mutationErrorHandler('msg_error_title_update_screen'),
  });

  const [updateChannelMutation, updateChannelMutationResult] = useUpdateChannelMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
  });

  const renderScreenDropdownList = () => {
    const screens = getNodes(screenDropdownQuery.data?.screens.edges);
    const allSelected = screens.every((screen) => screen.subscribedShow?.id === showId);

    const onSelectAllOptionClick = () => {
      analytics.track('show_assign_to_screens', {
        show_id: gqlIdToUuid(showId),
        action: allSelected ? 'deselect-all' : 'select-all',
        event_location: eventLocation,
      });
      screens.forEach((screen) => {
        screenChangeShowMutation({
          variables: {
            input: {
              id: screen.id,
              subscribedShow: allSelected ? null : showId,
            },
          },
        });
      });
    };

    const onOptionClick = (screen: ScreenDropdownItemFragment, selected: boolean) => () => {
      analytics.track('show_assign_to_screens', {
        show_id: gqlIdToUuid(showId),
        screen_id: gqlIdToUuid(screen.id),
        action: selected ? 'deselect' : 'select',
        event_location: eventLocation,
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

    if (screenDropdownQuery.loading) {
      return (
        <div className={styles.loadingIconContainer}>
          <Icon icon={IconType.Loading} iconStyle={IconStyle.Secondary} spin={true} />
        </div>
      );
    }

    if (!screens.length) {
      return (
        <Typography className={styles.noOptionMessage} WrapperElement="div">
          {t('msg_common_dropdown_no_options')}
        </Typography>
      );
    }

    return (
      <>
        <DropDownItem className={styles.tabDropdownItem} closeOnClick={false} onClick={onSelectAllOptionClick}>
          <SelectableOption text={t('msg_common_all_screens_option')} selected={allSelected} />
        </DropDownItem>
        {screens.map((screen) => {
          const selected = screen.subscribedShow?.id === showId;
          return (
            <DropDownItem
              key={screen.id}
              className={styles.tabDropdownItem}
              closeOnClick={false}
              onClick={onOptionClick(screen, selected)}
            >
              <SelectableOption text={screen.name} selected={selected} />
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
          const showIds = channel.shows.map((showNode) => showNode.show.id);
          const selected = showIds.includes(showId);

          const onClick = () => {
            analytics.track('show_assign_to_channels', {
              show_id: gqlIdToUuid(showId),
              channel_id: gqlIdToUuid(channel.id),
              action: selected ? 'deselect' : 'select',
              event_location: eventLocation,
            });
            updateChannelMutation({
              variables: {
                input: {
                  id: channel.id,
                  name: channel.name,
                  shows: selected ? showIds.filter((id) => id !== showId) : [...showIds, showId],
                },
              },
            });
          };

          return (
            <DropDownItem key={channel.id} className={styles.tabDropdownItem} closeOnClick={false} onClick={onClick}>
              <SelectableOption
                text={channel.name}
                selected={selected}
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
      contentClassName={classnames({
        [styles.savingOverlay]: screenChangeShowMutationResult.loading || updateChannelMutationResult.loading,
      })}
      align={align}
      component={
        <Badge color={BadgeColor.Purple} title={title}>
          <Typography styleType={TextType.TinyLink}>{t('msg_common_add_to')}</Typography>
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
            color={activeTab === Tab.Screen ? TextColor.Blue : TextColor.LightGrey}
            onClick={() => setActiveTab(Tab.Screen)}
          >
            {t('msg_common_screen')}
          </Typography>
        </div>
        <div className={styles.tabContent}>
          {activeTab === Tab.Channel ? renderChannelDropdownList() : renderScreenDropdownList()}
        </div>
      </div>
    </DropDown>
  );
};

export default AddToDropdown;
