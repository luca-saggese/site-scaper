import React from 'react';

import Button from '@Components/Button';
import { useModal } from '@Components/Modal';
import InviteUserModalBody from '@Components/Modal/InviteUserModalBody';
import Typography, { TextType } from '@Components/Typography';
import { Permission } from '@Config/permissions';
import { ActiveOrganizationInfoFragment, UserInfoFragment } from '@Graphql/graphqlTypes.generated';
import OrganizationPendingInvite from '@Routes/user/pages/organization/UsersTabView/OrganizationPendingInvite';
import OrganizationUser from '@Routes/user/pages/organization/UsersTabView/OrganizationUser';
import { useTranslation } from '@Utils/i18n';

import styles from './UsersTabView.module.scss';

interface UsersTabViewInterface {
  activeOrganization: ActiveOrganizationInfoFragment;
  currentUser: UserInfoFragment;
  refetch: () => void;
}

const UsersTabView: React.FunctionComponent<UsersTabViewInterface> = ({ activeOrganization, currentUser, refetch }) => {
  const t = useTranslation();
  const { showModal } = useModal();

  const canEditOrganizationDetails = activeOrganization.permissions.includes(Permission.EditOrganization);

  const handleAddMemberClick = async () => {
    await showModal({
      component: InviteUserModalBody,
      props: {
        organization: activeOrganization.organization,
      },
    });

    refetch();
  };

  return (
    <>
      <Typography styleType={TextType.LargeBoldHeadline} className={styles.header} WrapperElement="div">
        {t('msg_sidebar_organization_users')}
      </Typography>
      <div>
        <Button disabled={!canEditOrganizationDetails} onClick={handleAddMemberClick}>
          <Typography>{t('msg_label_add_member')}</Typography>
        </Button>
      </div>
      <div className={styles.members}>
        <Typography styleType={TextType.TinyHeadline}>
          {t('msg_label_users_in_organization', {
            number: activeOrganization.organization.users.length,
          })}
        </Typography>
      </div>
      <div className={styles.users}>
        {activeOrganization.organization.users.map((user) => (
          <OrganizationUser
            key={user.id}
            user={user}
            activeOrganization={activeOrganization}
            currentUser={currentUser}
          />
        ))}
        {activeOrganization.organization.pendingInvitations.map((invitation) => (
          <OrganizationPendingInvite
            key={invitation.id}
            activeOrganization={activeOrganization}
            invitation={invitation}
          />
        ))}
      </div>
    </>
  );
};

export default UsersTabView;
