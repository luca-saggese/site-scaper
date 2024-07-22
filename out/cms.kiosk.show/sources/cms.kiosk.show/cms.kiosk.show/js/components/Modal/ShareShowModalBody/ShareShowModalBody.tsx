import React from 'react';

import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import { ModalProps } from '@Components/Modal';
import { toastInfo } from '@Components/Toastify';
import Typography from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { ShowDetailsFragment, useUpdateShowMutation } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ShareShowModalBody.module.scss';

interface ShareShowModalData extends ModalProps {
  show: ShowDetailsFragment;
}

const ShareShowModalBody: React.FunctionComponent<ShareShowModalData> = ({ show: initialShow, closeModal }) => {
  const t = useTranslation();

  const [updateShowMutation, updateShowMutationResult] = useUpdateShowMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
  });

  const show = updateShowMutationResult.data?.updateShow.show || initialShow;

  if (!show.isPublic) {
    return (
      <div className={styles.container}>
        <div>
          <Typography>{t('msg_share_show_modal_text', { name: show.name })}</Typography>
        </div>
        <div className={styles.controls}>
          <Button
            className={styles.confirmButton}
            buttonStyle={ButtonStyle.Secondary}
            buttonColor={ButtonColor.Blue}
            disabled={updateShowMutationResult.loading}
            onClick={() => {
              analytics.track('show_make_public', {
                show_id: gqlIdToUuid(show.id),
                event_location: 'show_editor',
              });
              updateShowMutation({
                variables: { input: { id: show.id, name: show.name, isPublic: true } },
              });
            }}
          >
            {t('msg_share_show_modal_confirm_button')}
          </Button>
          <Button onClick={() => closeModal()} buttonStyle={ButtonStyle.Text} buttonColor={ButtonColor.Black}>
            {t('msg_common_cancel')}
          </Button>
        </div>
      </div>
    );
  }

  const publicUrl = `${window.location.origin}${RouteConfig.PublicShow.buildLink({
    publicId: show.publicId,
  })}`;

  return (
    <div className={styles.container}>
      <div>
        <Typography>{t('msg_public_show_modal_text')}</Typography>
        <div className={styles.infoMessage}>
          <Typography>{publicUrl}</Typography>
          <Button
            buttonType={ButtonType.Button}
            buttonStyle={ButtonStyle.Text}
            buttonColor={ButtonColor.Black}
            disabled={updateShowMutationResult.loading}
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
            analytics.track('show_make_private', {
              show_id: gqlIdToUuid(show.id),
              event_location: 'show_editor',
            });
            updateShowMutation({
              variables: { input: { id: show.id, name: show.name, isPublic: false } },
            });
          }}
        >
          {t('msg_public_show_modal_confirm_button')}
        </Button>
        <Button onClick={closeModal} buttonStyle={ButtonStyle.Text} buttonColor={ButtonColor.Black}>
          {t('msg_common_close')}
        </Button>
      </div>
    </div>
  );
};

export default ShareShowModalBody;
