import React, { FunctionComponent } from 'react';

import Avatar from '@Components/Avatar';
import { ButtonColor } from '@Components/Button';
import Divider from '@Components/Divider';
import DropDown from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import Icon, { IconType } from '@Components/Icon';
import { useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import Typography, { TextType } from '@Components/Typography';
import { Permission } from '@Config/permissions';
import {
  ActiveOrganizationInfoFragment,
  MeDocument,
  PendingInvitationFragment,
  useCancelInviteUserMutation,
} from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './OrganizationPendingInvite.module.scss';

export interface OrganizationPendingInviteProps {
  activeOrganization: ActiveOrganizationInfoFragment;
  invitation: PendingInvitationFragment;
}

const OrganizationPendingInvite: FunctionComponent<OrganizationPendingInviteProps> = ({
  activeOrganization,
  invitation,
}) => {
  const t = useTranslation();
  const { showModal } = useModal();

  const [cancelInviteUserMutation] = useCancelInviteUserMutation({
    variables: {
      input: {
        email: invitation.emailTo,
      },
    },
    onError: mutationErrorHandler('msg_error_title_removing_user_from_organization'),
    refetchQueries: [{ query: MeDocument }],
  });

  const handleRemove = async () => {
    const { action } = await showModal({
      component: ConfirmationModalBody,
      props: {
        confirmButton: {
          color: ButtonColor.Red,
          label: t('msg_label_remove_button_label'),
        },
        cancelButton: {
          color: ButtonColor.Black,
          label: t('msg_label_cancel_button_label'),
        },
        content: (
          <Typography>
            {t('msg_label_remove_user_from_org_label', {
              name: invitation.emailTo,
              org: activeOrganization.organization.name,
            })}
          </Typography>
        ),
      },
    });

    if (action !== 'CONFIRM') {
      return;
    }

    analytics.track('org_users_cancel_invite', {
      invitation_id: gqlIdToUuid(invitation.id),
      event_location: 'settings',
    });

    cancelInviteUserMutation();
  };

  const canRemove = activeOrganization.permissions.includes(Permission.RemoveMember);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Avatar />
        <Typography className={styles.emailTo}>{invitation.emailTo}</Typography>
        <Typography className={styles.pendingStatus}>{t('msg_pending_user_status')}</Typography>
        {canRemove && (
          <DropDown
            className={styles.dropdown}
            contentClassName={styles.dropdownContent}
            component={<Icon icon={IconType.More} />}
          >
            <DropDownItem onClick={handleRemove}>
              <Typography styleType={TextType.LowerCaseLink} className={styles.remove}>
                {t('msg_label_cancel_pending_invitation')}
              </Typography>
            </DropDownItem>
          </DropDown>
        )}
      </div>
      <Divider className={styles.divider} />
    </div>
  );
};

export default OrganizationPendingInvite;
