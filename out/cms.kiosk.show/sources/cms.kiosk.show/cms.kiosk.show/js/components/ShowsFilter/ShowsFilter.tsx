import classnames from 'classnames';
import React, { FunctionComponent, useMemo } from 'react';
import { Form, FormSpy } from 'react-final-form';

import CheckboxGroup from '@Components/Form/CheckboxGroup';
import FilterSelect from '@Components/Form/FilterSelect';
import FormField from '@Components/Form/FormField';
import TextInput from '@Components/Form/TextInput';
import Icon, { IconType } from '@Components/Icon';
import { useMeQuery, useShowFiltersChannelsQuery } from '@Graphql/graphqlTypes.generated';
import { getNodes, noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';
import { SelectItem } from '@Utils/types';

import styles from './ShowsFilter.module.scss';

export interface ShowsFilterVariables {
  search: string;
  onScreen: LiveStatusFilterValue[];
  access: AccessFilterValue[];
  orderBy: string;
  channel: string;
  createdBy: string;
  updatedBy: string;
}

export interface ShowsFilterFormValues {
  search: string;
  onScreen: LiveStatusFilterValue[];
  access: AccessFilterValue[];
  orderBy: SelectItem;
  channel: SelectItem;
  createdBy: SelectItem;
  updatedBy: SelectItem;
}

export interface ShowFilterProps {
  variables: ShowsFilterVariables;
  onVariablesChange: (values: ShowsFilterVariables) => void;
  className?: string;
}

export enum LiveStatusFilterValue {
  ON_SCREEN = 'ON_SCREEN',
  OFF_SCREEN = 'OFF_SCREEN',
}

export enum AccessFilterValue {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export function onScreenToValue(value: LiveStatusFilterValue[]) {
  if (value.length === 0 || value.length === 2) {
    return undefined;
  }

  return value[0] === LiveStatusFilterValue.ON_SCREEN;
}

export function accessToValue(value: AccessFilterValue[]) {
  if (value.length === 0 || value.length === 2) {
    return undefined;
  }

  return value[0] === AccessFilterValue.PUBLIC;
}

export const defaultShowFilterVariables: Readonly<ShowsFilterVariables> = {
  search: '',
  orderBy: '-updated_at',
  channel: '',
  createdBy: '',
  updatedBy: '',
  onScreen: [LiveStatusFilterValue.ON_SCREEN, LiveStatusFilterValue.OFF_SCREEN],
  access: [AccessFilterValue.PUBLIC, AccessFilterValue.PRIVATE],
};

const ShowsFilter: FunctionComponent<ShowFilterProps> = ({ className, variables, onVariablesChange }) => {
  const t = useTranslation();

  const { data: channelData } = useShowFiltersChannelsQuery({ fetchPolicy: 'network-only' });
  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });

  // Form value defaults
  const defaults = useMemo(
    () => ({
      orderBy: {
        label: t('msg_label_show_filter_sort_by_recently_edited'),
        value: defaultShowFilterVariables.orderBy,
      },
      channel: {
        value: defaultShowFilterVariables.channel,
        label: t('msg_label_show_filter_select_all_channels'),
      },
      createdBy: {
        value: defaultShowFilterVariables.createdBy,
        label: t('msg_label_show_filter_select_any_team_member'),
      },
      updatedBy: {
        value: defaultShowFilterVariables.updatedBy,
        label: t('msg_label_show_filter_select_any_team_member'),
      },
      onScreen: [LiveStatusFilterValue.ON_SCREEN, LiveStatusFilterValue.OFF_SCREEN],
      access: [AccessFilterValue.PUBLIC, AccessFilterValue.PRIVATE],
    }),
    [t]
  );

  // Build all the form options dynamically
  // Order by, channels, users
  const orderByOptions = useMemo(
    () => [defaults.orderBy, { label: t('msg_label_show_filter_sort_by_recently_created'), value: '-created_at' }],
    [t, defaults]
  );

  const channelOptions = useMemo(
    () => [
      defaults.channel,
      ...getNodes(channelData?.channels.edges).map((node) => ({ value: node.id, label: node.name })),
    ],
    [channelData, defaults]
  );

  const usersOptions = useMemo(
    () => [
      defaults.createdBy,
      ...(meData?.me.info.activeOrganization?.organization.users.map((user) => ({
        value: user.id,
        label: user.name,
      })) || []),
    ],
    [meData, defaults]
  );

  const onScreenOptions = useMemo(
    () => [
      { label: t('msg_label_show_filter_on_screen'), value: LiveStatusFilterValue.ON_SCREEN },
      { label: t('msg_label_show_filter_off_screen'), value: LiveStatusFilterValue.OFF_SCREEN },
    ],
    [t]
  );

  const accessOptions = useMemo(
    () => [
      { label: t('msg_common_public'), value: AccessFilterValue.PUBLIC },
      { label: t('msg_common_private'), value: AccessFilterValue.PRIVATE },
    ],
    [t]
  );

  // Active values of the filter form
  const filterFormValues = useMemo<ShowsFilterFormValues>(() => {
    return {
      search: variables.search || '',
      orderBy: orderByOptions.find((option) => option.value === variables.orderBy) || defaults.orderBy,
      channel: channelOptions.find((option) => option.value === variables.channel) || defaults.channel,
      createdBy: usersOptions.find((option) => option.value === variables.createdBy) || defaults.createdBy,
      updatedBy: usersOptions.find((option) => option.value === variables.updatedBy) || defaults.updatedBy,
      onScreen: variables.onScreen || defaults.onScreen,
      access: variables.access || defaults.access,
    };
  }, [orderByOptions, channelOptions, usersOptions, defaults, variables]);

  return (
    <Form<ShowsFilterFormValues>
      initialValues={filterFormValues}
      onSubmit={noop}
      subscription={{ values: true }}
      render={() => (
        <div className={classnames(styles.container, className)}>
          <div className={styles.searchContainer}>
            <FormField
              name="search"
              component={TextInput}
              inputClassName={styles.searchInput}
              placeholder={t('msg_placeholder_search_shows')}
            />
            <Icon icon={IconType.Search} />
          </div>
          <FormField
            name="orderBy"
            label={t('msg_field_label_show_filter_sort_by')}
            component={FilterSelect}
            className={styles.filter}
            options={orderByOptions}
            isMulti={false}
          />
          <FormField
            name="onScreen"
            label={t('msg_field_label_show_filter_live_status')}
            component={CheckboxGroup}
            className={styles.filter}
            options={onScreenOptions}
          />
          <FormField
            name="channel"
            label={t('msg_field_label_show_filter_channel')}
            component={FilterSelect}
            className={styles.filter}
            options={channelOptions}
            isMulti={false}
          />
          <FormField
            name="createdBy"
            label={t('msg_field_label_show_filter_created_by')}
            component={FilterSelect}
            className={styles.filter}
            options={usersOptions}
            isMulti={false}
          />
          <FormField
            name="updatedBy"
            label={t('msg_field_label_show_filter_updated_by')}
            component={FilterSelect}
            className={styles.filter}
            options={usersOptions}
            isMulti={false}
          />
          <FormField
            name="access"
            label={t('msg_field_label_show_filter_access')}
            component={CheckboxGroup}
            className={styles.filter}
            options={accessOptions}
          />
          <FormSpy<ShowsFilterFormValues>
            subscription={{ values: true, dirty: true }}
            onChange={(state) => {
              if (state.dirty) {
                onVariablesChange({
                  search: state.values.search,
                  onScreen: state.values.onScreen,
                  access: state.values.access,
                  orderBy: state.values.orderBy.value,
                  channel: state.values.channel.value,
                  createdBy: state.values.createdBy.value,
                  updatedBy: state.values.updatedBy.value,
                });
              }
            }}
          />
        </div>
      )}
    />
  );
};

export default ShowsFilter;
