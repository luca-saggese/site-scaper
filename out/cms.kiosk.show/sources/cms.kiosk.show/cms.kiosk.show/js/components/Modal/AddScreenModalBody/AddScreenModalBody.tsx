import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Icon, { IconSize, IconStyle, IconType } from '@Components/Icon';
import { ModalProps } from '@Components/Modal';
import styles from '@Components/Modal/AddScreenModalBody/AddScreenModalBody.module.scss';
import ModalContainer from '@Components/Modal/ModalContainer';
import Typography, { TextType } from '@Components/Typography';
import { DEFAULT_PAGE_SIZE } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  ScreenDeviceType,
  ScreenRotation,
  ScreensListDocument,
  useAddScreenMutation,
  useMeQuery,
  useUpdateScreenMutation,
} from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { mutationErrorHandler } from '@Utils/graphql';
import { gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import ScreenChannelView from './screenChannel';
import ScreenNameView from './screenName';
import ScreenOverscanView from './screenOverscan';
import ScreenRegistrationCodeView from './screenRegistrationCode';
import ScreenRotationView from './screenRotation';

interface AddScreenModalBodyProps extends ModalProps {
  closeModal: (props?: { action: 'UPDATE' } | { action: 'CLOSE' }) => void;
}

const AddScreenModalBody: React.FunctionComponent<AddScreenModalBodyProps> = ({ closeModal }) => {
  const location = useLocation();
  const history = useHistory();
  const meQuery = useMeQuery();
  const t = useTranslation();

  const urlParams = new URLSearchParams(location.search);
  const [usedQrCode] = useState(urlParams.has('registrationCode'));

  const values = {
    name: urlParams.get('name') || '',
    overscanEnabled: urlParams.get('overscanEnabled') || undefined,
    rotation: urlParams.get('rotation') || undefined,
  };

  useEffect(
    () => () => {
      history.push(RouteConfig.Screens.buildLink());
    },
    [history]
  );

  const [addScreenMutation, { data }] = useAddScreenMutation({
    onCompleted: (result) => {
      const id = result.addScreen.screen?.id;
      assertIsDefined(id);
      analytics.track('screen_create', {
        screen_id: gqlIdToUuid(id),
        usedQrCode,
        event_location: 'screen_onboarding',
      });
    },
    onError: mutationErrorHandler('msg_error_title_add_screen'),
    refetchQueries: [{ query: ScreensListDocument, variables: { first: DEFAULT_PAGE_SIZE } }],
  });

  const [updateScreenMutation, updateScreenMutationResult] = useUpdateScreenMutation({
    onCompleted: () => {
      history.push(RouteConfig.Screens.buildLink());
      closeModal({ action: 'UPDATE' });
    },
    onError: mutationErrorHandler('msg_error_title_update_screen'),
    refetchQueries: [{ query: ScreensListDocument, variables: { first: DEFAULT_PAGE_SIZE } }],
  });

  const activeOrganizationId = meQuery.data?.me.info.activeOrganization?.organization.id;

  if (!activeOrganizationId) {
    return null;
  }

  const renderContent = () => {
    if (!data?.addScreen.screen) {
      return (
        <ScreenRegistrationCodeView
          registrationCode={Number(urlParams.get('registrationCode')) || undefined}
          onSubmit={(formValues) => {
            assertIsDefined(formValues.registrationCode);
            addScreenMutation({
              variables: {
                input: {
                  organization: activeOrganizationId,
                  registrationCode: formValues.registrationCode,
                },
              },
            });
          }}
        />
      );
    }

    const { screen } = data.addScreen;

    if (!values.name) {
      return (
        <ScreenNameView
          screen={screen}
          onSubmit={(formValues) => {
            history.push({
              search: `?${queryString.stringify({
                ...values,
                name: formValues.name,
              })}`,
            });
          }}
        />
      );
    }

    if (!values.rotation) {
      return (
        <ScreenRotationView
          screen={screen}
          onNext={(rotation) => {
            history.push({
              search: `?${queryString.stringify({
                ...values,
                rotation,
              })}`,
            });
          }}
        />
      );
    }

    if (values.overscanEnabled === undefined && screen.deviceType === ScreenDeviceType.Electron) {
      return (
        <ScreenOverscanView
          screen={screen}
          onSelect={(overscanEnabled) => {
            history.push({
              search: `?${queryString.stringify({
                ...values,
                overscanEnabled,
              })}`,
            });
          }}
        />
      );
    }

    return (
      <ScreenChannelView
        screen={screen}
        onSelect={(channelId) => {
          analytics.track('screen_change_content', {
            screen_id: gqlIdToUuid(screen.id),
            channel_id: channelId ? gqlIdToUuid(channelId) : undefined,
            event_location: 'screen_onboarding',
          });
          updateScreenMutation({
            variables: {
              input: {
                id: screen.id,
                isScreenInfoVisible: screen.isScreenInfoVisible,
                name: values.name || '',
                overscanEnabled: values.overscanEnabled === 'true',
                rotation: values.rotation as ScreenRotation,
                subscribedChannel: channelId,
              },
            },
          });
        }}
      />
    );
  };

  if (updateScreenMutationResult.loading) {
    return (
      <ModalContainer>
        <div className={styles.savingInProgressMessage}>
          <Typography styleType={TextType.MediumHeadline} WrapperElement="div">
            {t('msg_common_saving')}
          </Typography>
          <Icon
            className={styles.savingInProgressIcon}
            icon={IconType.Loading}
            iconStyle={IconStyle.None}
            size={IconSize.XL}
            spin={true}
          />
        </div>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <Icon
        icon={IconType.Close}
        iconStyle={IconStyle.None}
        className={styles.closeIcon}
        onClick={() => {
          closeModal();
        }}
      />
      {renderContent()}
    </ModalContainer>
  );
};

export default AddScreenModalBody;
