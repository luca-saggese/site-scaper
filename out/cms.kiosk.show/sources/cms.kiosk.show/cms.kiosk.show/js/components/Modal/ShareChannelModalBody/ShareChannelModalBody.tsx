import React from 'react';

import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import { ModalProps } from '@Components/Modal';
import { toastInfo } from '@Components/Toastify';
import Typography from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { ChannelFragment, usePublishChannelMutation } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ShareChannelModalBody.module.scss';

interface ShareChannelModalData extends ModalProps {
  channel: ChannelFragment;
}

const ShareChannelModalBody: React.FunctionComponent<ShareChannelModalData> = ({
  channel: initialChannel,
  closeModal,
}) => {
  const t = useTranslation();

  const [publishChannelMutation, publishChannelMutationResult] = usePublishChannelMutation({
    onError: mutationErrorHandler('msg_error_title_saving_channel'),
  });

  const channel = publishChannelMutationResult.data?.publishChannel.channel || initialChannel;

  if (!channel.isPublic) {
    return (
      <div className={styles.container}>
        <div>
          <Typography>{t('msg_share_channel_modal_text', { name: channel.name })}</Typography>
        </div>
        <div className={styles.controls}>
          <Button
            className={styles.confirmButton}
            buttonStyle={ButtonStyle.Secondary}
            buttonColor={ButtonColor.Blue}
            disabled={publishChannelMutationResult.loading}
            onClick={() => {
              analytics.track('channel_make_public', {
                channel_id: gqlIdToUuid(channel.id),
                event_location: 'channel_editor',
              });
              publishChannelMutation({
                variables: { input: { id: channel.id, isPublic: true } },
              });
            }}
          >
            {t('msg_share_channel_modal_confirm_button')}
          </Button>
          <Button onClick={() => closeModal()} buttonStyle={ButtonStyle.Text} buttonColor={ButtonColor.Black}>
            {t('msg_common_cancel')}
          </Button>
        </div>
      </div>
    );
  }

  const publicUrl = `${window.location.origin}${RouteConfig.PublicChannel.buildLink({
    publicId: channel.publicId,
  })}`;

  return (
    <div className={styles.container}>
      <div>
        <Typography>{t('msg_public_channel_modal_text')}</Typography>
        <div className={styles.infoMessage}>
          <Typography>{publicUrl}</Typography>
          <Button
            buttonType={ButtonType.Button}
            buttonStyle={ButtonStyle.Text}
            buttonColor={ButtonColor.Black}
            disabled={publishChannelMutationResult.loading}
            onClick={() => {
              navigator.clipboard.writeText(publicUrl);
              toastInfo('msg_common_copied_to_clipboard');
            }}
          >
            {t('msg_common_copy')}
          </Button>
        </div>
      </div>
      <div className={styles.controls}>
        <Button
          className={styles.confirmButton}
          buttonStyle={ButtonStyle.Secondary}
          buttonColor={ButtonColor.Red}
          onClick={() => {
            analytics.track('channel_make_private', {
              channel_id: gqlIdToUuid(channel.id),
              event_location: 'channel_editor',
            });
            publishChannelMutation({
              variables: { input: { id: channel.id, isPublic: false } },
            });
          }}
        >
          {t('msg_public_channel_modal_confirm_button')}
        </Button>
        <Button onClick={closeModal} buttonStyle={ButtonStyle.Text} buttonColor={ButtonColor.Black}>
          {t('msg_common_close')}
        </Button>
      </div>
    </div>
  );
};

export default ShareChannelModalBody;
