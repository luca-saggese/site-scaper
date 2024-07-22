import React from 'react';

import Badge, { BadgeColor } from '@Components/Badge';
import Button from '@Components/Button';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import Image from '@Components/Image';
import { ModalProps } from '@Components/Modal';
import ModalContainer from '@Components/Modal/ModalContainer';
import Typography, { TextColor, TextType } from '@Components/Typography';
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

import styles from './ConnectToDropboxModalBody.module.scss';
import DropboxScreenshotImage from './dropbox_hint.png';

const ConnectToDropboxModalBody: React.FunctionComponent<ModalProps> = ({ closeModal }) => {
  const t = useTranslation();

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

  const credentials = activeOrganization.organization.registeredCredentials.find(
    (credential) => credential.credentialType === ExternalCredentialCredentialType.Dropbox
  );

  const { openDropboxAuthWindow } = useDropboxAuth({
    onAccessTokenReceived: async (accessToken) => {
      if (credentials) {
        analytics.track('org_integrations_remove', {
          credential_type: AvailableCredentialTypes.Dropbox,
          event_location: 'show_editor',
        });
        await deleteExternalCredentialsMutation({
          variables: { input: { credentialType: AvailableCredentialTypes.Dropbox } },
        });
      }

      analytics.track('org_integrations_add', {
        credential_type: AvailableCredentialTypes.Dropbox,
        event_location: 'show_editor',
      });
      registerExternalCredentialsMutation({
        variables: { input: { accessToken, credentialType: AvailableCredentialTypes.Dropbox } },
      });
    },
  });

  return (
    <ModalContainer>
      <div className={styles.topContainer}>
        <Typography styleType={TextType.MediumHeadline} WrapperElement="div">
          {t('msg_connect_to_dropbox_modal_title')}
        </Typography>
        <Icon
          icon={IconType.Close}
          iconStyle={IconStyle.None}
          className={styles.closeIcon}
          onClick={() => closeModal()}
        />
      </div>
      <div className={styles.content}>
        {credentials ? (
          <div>
            <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
              {t('msg_connect_to_dropbox_modal_instruction_4')}
            </Typography>
            <Badge color={BadgeColor.Purple}>
              <Typography styleType={TextType.TinyLink}>{credentials.integrationUser}</Typography>
            </Badge>
          </div>
        ) : (
          <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_connect_to_dropbox_modal_instruction_1')}
          </Typography>
        )}

        <div>
          <Button onClick={openDropboxAuthWindow}>
            {t(
              credentials
                ? 'msg_connect_to_dropbox_modal_connect_to_different_dropbox_button'
                : 'msg_connect_to_dropbox_modal_connect_button'
            )}
          </Button>
        </div>
        <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
          {t('msg_connect_to_dropbox_modal_instruction_2')}
        </Typography>
        <Image src={DropboxScreenshotImage} className={styles.screenshotImage} />
        <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
          {t('msg_connect_to_dropbox_modal_instruction_3')}
        </Typography>
      </div>
    </ModalContainer>
  );
};

export default ConnectToDropboxModalBody;
