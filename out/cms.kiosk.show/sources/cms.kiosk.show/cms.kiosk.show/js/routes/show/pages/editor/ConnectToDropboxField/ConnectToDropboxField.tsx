import React from 'react';

import Badge, { BadgeColor } from '@Components/Badge';
import { ButtonColor } from '@Components/Button';
import HelpButton from '@Components/HelpButton';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import { useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import ConnectToDropboxModalBody from '@Components/Modal/ConnectToDropboxModalBody';
import Typography, { TextType } from '@Components/Typography';
import {
  AvailableCredentialTypes,
  ExternalCredentialCredentialType,
  useDeleteExternalCredentialsMutation,
  useRegisterExternalCredentialsMutation,
} from '@Graphql/graphqlTypes.generated';
import useActiveOrganization from '@Hooks/useActiveOrganization';
import useDropboxAuth from '@Hooks/useDropboxAuth';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';

import styles from './ConnectToDropboxField.module.scss';

interface ConnectToDropboxFieldProps {
  label: string;
}

const ConnectToDropboxField: React.FunctionComponent<ConnectToDropboxFieldProps> = ({ label }) => {
  const t = useTranslation();
  const { showModal } = useModal();

  const { activeOrganization, refetch } = useActiveOrganization();

  const [registerExternalCredentialsMutation] = useRegisterExternalCredentialsMutation({
    onCompleted: () => {
      refetch();
    },
    onError: mutationErrorHandler('msg_error_title_register_external_credentials'),
  });

  const [deleteExternalCredentialsMutation] = useDeleteExternalCredentialsMutation({
    onCompleted: () => {
      refetch();
    },
    onError: mutationErrorHandler('msg_error_title_delete_external_credentials'),
  });

  const { openDropboxAuthWindow } = useDropboxAuth({
    onAccessTokenReceived: (accessToken) => {
      analytics.track('org_integrations_add', {
        credential_type: AvailableCredentialTypes.Dropbox,
        event_location: 'show_editor',
      });
      registerExternalCredentialsMutation({
        variables: { input: { accessToken, credentialType: AvailableCredentialTypes.Dropbox } },
      });
    },
  });

  const onHelpClick = () => {
    showModal({
      component: ConnectToDropboxModalBody,
    });
  };

  const handleDisconnectFromDropboxClick = async () => {
    const { action } = await showModal({
      component: ConfirmationModalBody,
      props: {
        confirmButton: {
          color: ButtonColor.Blue,
          label: t('msg_label_disconnect_from_integration_modal_confirm_button_label'),
        },
        cancelButton: {
          color: ButtonColor.Black,
          label: t('msg_label_disconnect_from_integration_modal_cancel_button_label'),
        },
        content: <Typography>{t('msg_label_disconnect_from_integration_modal_text')}</Typography>,
      },
    });

    if (action !== 'CONFIRM') {
      return;
    }

    analytics.track('org_integrations_remove', {
      credential_type: AvailableCredentialTypes.Dropbox,
      event_location: 'show_editor',
    });
    deleteExternalCredentialsMutation({
      variables: { input: { credentialType: AvailableCredentialTypes.Dropbox } },
    });
  };

  const credentials = activeOrganization.organization.registeredCredentials.find(
    (credential) => credential.credentialType === ExternalCredentialCredentialType.Dropbox
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography className={styles.label} styleType={TextType.TinyHeadline}>
          {label}
        </Typography>
        <HelpButton onClick={onHelpClick} />
      </div>
      {credentials ? (
        <div className={styles.connectedAccount}>
          <Badge color={BadgeColor.Purple}>
            <Typography styleType={TextType.TinyLink}>{credentials.integrationUser}</Typography>
          </Badge>
          <Icon
            icon={IconType.Close}
            iconStyle={IconStyle.None}
            className={styles.removeAccountIcon}
            onClick={handleDisconnectFromDropboxClick}
          />
        </div>
      ) : (
        <Typography
          className={styles.connectButton}
          styleType={TextType.LowerCaseLink}
          onClick={openDropboxAuthWindow}
          WrapperElement="div"
        >
          {t('msg_connect_to_dropbox_field_connect_button')}
        </Typography>
      )}
    </div>
  );
};

export default ConnectToDropboxField;
