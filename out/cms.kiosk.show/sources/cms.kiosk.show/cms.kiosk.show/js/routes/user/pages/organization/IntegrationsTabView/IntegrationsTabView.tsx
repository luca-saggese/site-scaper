import React from 'react';

import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import { useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import Typography, { TextType } from '@Components/Typography';
import {
  ActiveOrganizationInfoFragment,
  AvailableCredentialTypes,
  ExternalCredentialCredentialType,
  useDeleteExternalCredentialsMutation,
  useRegisterExternalCredentialsMutation,
} from '@Graphql/graphqlTypes.generated';
import useDropboxAuth from '@Hooks/useDropboxAuth';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';

import styles from './IntegrationsTabView.module.scss';

interface IntegrationsTabViewInterface {
  activeOrganization: ActiveOrganizationInfoFragment;
  refetch: () => void;
}

const IntegrationsTabView: React.FunctionComponent<IntegrationsTabViewInterface> = ({
  activeOrganization,
  refetch,
}) => {
  const t = useTranslation();
  const { showModal } = useModal();

  const [registerExternalCredentialsMutation] = useRegisterExternalCredentialsMutation({
    onCompleted: refetch,
    onError: mutationErrorHandler('msg_error_title_register_external_credentials'),
  });

  const [deleteExternalCredentialsMutation] = useDeleteExternalCredentialsMutation({
    onCompleted: refetch,
    onError: mutationErrorHandler('msg_error_title_delete_external_credentials'),
  });

  const { openDropboxAuthWindow } = useDropboxAuth({
    onAccessTokenReceived: (accessToken) => {
      analytics.track('org_integrations_add', {
        credential_type: AvailableCredentialTypes.Dropbox,
        event_location: 'settings',
      });
      registerExternalCredentialsMutation({
        variables: { input: { accessToken, credentialType: AvailableCredentialTypes.Dropbox } },
      });
    },
  });

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
      event_location: 'settings',
    });
    deleteExternalCredentialsMutation({
      variables: { input: { credentialType: AvailableCredentialTypes.Dropbox } },
    });
  };

  return (
    <>
      <Typography styleType={TextType.LargeBoldHeadline} className={styles.header} WrapperElement="div">
        {t('msg_sidebar_organization_integrations')}
      </Typography>
      <div>
        <div className={styles.integration}>
          <div className={styles.integrationInfo}>
            <Icon icon={IconType.Dropbox} iconStyle={IconStyle.None} />
            <div>
              <Typography WrapperElement="div">Dropbox</Typography>
              <Typography styleType={TextType.TinyLink} WrapperElement="div" className={styles.integrationUser}>
                {
                  activeOrganization.organization.registeredCredentials.find(
                    (credential) => credential.credentialType === ExternalCredentialCredentialType.Dropbox
                  )?.integrationUser
                }
              </Typography>
            </div>
          </div>
          {activeOrganization.organization.registeredCredentials.some(
            (credential) => credential.credentialType === ExternalCredentialCredentialType.Dropbox
          ) ? (
            <Button
              buttonType={ButtonType.Button}
              buttonTextStyle={TextType.LowerCaseLink}
              buttonColor={ButtonColor.White}
              buttonStyle={ButtonStyle.Text}
              onClick={handleDisconnectFromDropboxClick}
            >
              {t('msg_label_disconnect_from_dropbox')}
            </Button>
          ) : (
            <Button
              buttonType={ButtonType.Button}
              buttonTextStyle={TextType.LowerCaseLink}
              buttonColor={ButtonColor.White}
              buttonStyle={ButtonStyle.Text}
              onClick={openDropboxAuthWindow}
            >
              {t('msg_label_connect_to_dropbox')}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default IntegrationsTabView;
