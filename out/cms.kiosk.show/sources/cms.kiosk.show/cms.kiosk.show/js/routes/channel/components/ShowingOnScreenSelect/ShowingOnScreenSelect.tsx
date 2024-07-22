import React from 'react';
import { Props as ReactSelectProps } from 'react-select';

import Badge, { BadgeColor } from '@Components/Badge';
import DropDown, { DropDownAlign, DropDownPosition } from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import SelectableOption from '@Components/DropDown/SelectableOption';
import Icon, { IconType } from '@Components/Icon';
import Typography, { TextType } from '@Components/Typography';
import { useScreenChangeChannelMutation, useShowingOnScreensListQuery } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNodes, gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';
import { SelectItem } from '@Utils/types';

import styles from './ShowingOnScreenSelect.module.scss';

export interface ScreenSelectItem extends SelectItem {
  channelId?: string;
}

export interface ShowingOnScreenSelectProps extends ReactSelectProps {
  channelId: string;
  eventLocation: 'channel_editor' | 'channel_overview';
}

const ShowingOnScreenSelect: React.FunctionComponent<ShowingOnScreenSelectProps> = ({ channelId, eventLocation }) => {
  const t = useTranslation();

  const { data, loading } = useShowingOnScreensListQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  const [screenChangeChannelMutation] = useScreenChangeChannelMutation({
    onError: mutationErrorHandler('msg_error_title_update_screen'),
  });

  const options: ScreenSelectItem[] = getNodes(data?.screens.edges).map((node) => ({
    value: node.id,
    label: node.name,
    channelId: node.subscribedChannel?.id,
  }));

  const screenNames = options.filter((option) => option.channelId === channelId).map((option) => option.label);
  const allSelected = options.every((option) => option.channelId === channelId);

  const onSelectAllOptionClick = () => {
    analytics.track('channel_assign_to_screens', {
      channel_id: gqlIdToUuid(channelId),
      action: allSelected ? 'deselect-all' : 'select-all',
      event_location: eventLocation,
    });
    options.forEach((option) => {
      screenChangeChannelMutation({
        variables: {
          input: {
            id: option.value,
            subscribedChannel: allSelected ? null : channelId,
          },
        },
      });
    });
  };

  const onOptionClick = (option: ScreenSelectItem, selected: boolean) => () => {
    analytics.track('channel_assign_to_screens', {
      screen_id: gqlIdToUuid(option.value),
      channel_id: gqlIdToUuid(channelId),
      action: selected ? 'deselect' : 'select',
      event_location: eventLocation,
    });
    screenChangeChannelMutation({
      variables: {
        input: {
          id: option.value,
          subscribedChannel: selected ? null : channelId,
        },
      },
    });
  };

  const renderContent = () => {
    if (loading) {
      return <Icon className={styles.loadingIcon} icon={IconType.Loading} spin={true} disabled={true} />;
    }

    if (!options.length) {
      return (
        <Typography className={styles.noOptionMessage} WrapperElement="div">
          {t('msg_showing_on_screens_no_options')}
        </Typography>
      );
    }

    return (
      <>
        <DropDownItem className={styles.option} onClick={onSelectAllOptionClick}>
          <SelectableOption text={t('msg_common_all_screens_option')} selected={allSelected} />
        </DropDownItem>
        {options.map((option) => {
          const selected = option.channelId === channelId;

          return (
            <DropDownItem key={option.value} className={styles.option} onClick={onOptionClick(option, selected)}>
              <SelectableOption text={option.label} selected={selected} />
            </DropDownItem>
          );
        })}
      </>
    );
  };

  return (
    <DropDown
      align={DropDownAlign.Start}
      position={DropDownPosition.Bottom}
      contentClassName={styles.dropdownContent}
      component={
        <Badge color={screenNames.length === 0 ? BadgeColor.FadedBlue : BadgeColor.Red}>
          <Typography styleType={TextType.TinyLink}>
            {screenNames.length === 0 && t('msg_showing_on_screens_no_values')}
            {screenNames.length === 1 && t('msg_showing_on_screens_single_values', { name: screenNames[0] })}
            {screenNames.length > 1 && t('msg_showing_on_screens_multiple_values', { count: screenNames.length })}
          </Typography>
        </Badge>
      }
    >
      {renderContent()}
    </DropDown>
  );
};

export default ShowingOnScreenSelect;
