import classnames from 'classnames';
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
import { getAvailableRoleName, getRoleName, isSameRole, Permission } from '@Config/permissions';
import {
  ActiveOrganizationInfoFragment,
  AvailableRoleTypes,
  MeDocument,
  OrganizationUserFragment,
  OrganizationXGroupGroupType,
  useChangeOrganizationMemberRoleMutation,
  useRemoveUserFromOrganizationMutation,
  UserInfoFragment,
} from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './OrganizationUser.module.scss';

export interface OrganizationUserProps {
  user: OrganizationUserFragment;
  activeOrganization: ActiveOrganizationInfoFragment;
  currentUser: UserInfoFragment;
}

const OrganizationUser: FunctionComponent<OrganizationUserProps> = ({ user, activeOrganization, currentUser }) => {
  const t = useTranslation();
  const { showModal } = useModal();

  const [removeUserFromOrganization] = useRemoveUserFromOrganizationMutation({
    variables: {
      input: {
        organizationId: activeOrganization.organization.id,
        userId: user.id,
      },
    },
    onError: mutationErrorHandler('msg_error_title_removing_user_from_organization'),
    refetchQueries: [{ query: MeDocument }],
  });

  const [changeOrganizationUserRole] = useChangeOrganizationMemberRoleMutation({
    onError: mutationErrorHandler('msg_error_title_changing_organization_user_role'),
  });

  const isCurrentUser = user.email === currentUser.email;
  const isTargetUserOwner = user.organizationPermission?.groupType === OrganizationXGroupGroupType.Owner;
  const canRemove = !isTargetUserOwner && activeOrganization.permissions.includes(Permission.RemoveMember);
  const canChangeRole = !isTargetUserOwner && activeOrganization.permissions.includes(Permission.ChangeRole);
  const canPerformAnyAction = canRemove || canChangeRole;

  const controlsAvailable = !isCurrentUser && canPerformAnyAction;

  const handleRemove = async () => {
    if (!canRemove) {
      return;
    }

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
              name: user.name,
              org: activeOrganization.organization.name,
            })}
          </Typography>
        ),
      },
    });

    if (action !== 'CONFIRM') {
      return;
    }

    analytics.track('org_users_remove', {
      user_id: gqlIdToUuid(user.id),
      event_location: 'settings',
    });
    await removeUserFromOrganization();
  };

  const handleRoleChange = async (role: AvailableRoleTypes) => {
    if (!canChangeRole) {
      return;
    }

    const { action } = await showModal({
      component: ConfirmationModalBody,
      props: {
        confirmButton: {
          color: ButtonColor.Black,
          label: t('msg_change_role_btn_label'),
        },
        cancelButton: {
          color: ButtonColor.Black,
          label: t('msg_label_cancel_button_label'),
        },
        content: (
          <Typography>
            {t('msg_change_role_label', {
              name: user.name,
              role: role.toLocaleLowerCase(),
            })}
          </Typography>
        ),
      },
    });

    if (action !== 'CONFIRM') {
      return;
    }

    analytics.track('org_users_change_permissions', {
      user_id: gqlIdToUuid(user.id),
      role,
      event_location: 'settings',
    });
    await changeOrganizationUserRole({
      variables: {
        input: {
          newRole: role,
          organizationId: activeOrganization.organization.id,
          userId: user.id,
        },
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Avatar avatar={user.avatar} />
        <Typography className={styles.userName} styleType={isCurrentUser ? TextType.LowerCaseLink : TextType.Body}>
          {user.name}
        </Typography>
        <Typography className={styles.userRole}>{t(getRoleName(user.organizationPermission?.groupType))}</Typography>
        {controlsAvailable && (
          <DropDown
            className={styles.dropdown}
            contentClassName={styles.dropdownContent}
            component={<Icon icon={IconType.More} />}
          >
            {canChangeRole &&
              Object.values(AvailableRoleTypes).map((availableRole, index) => {
                const activeRole = isSameRole(availableRole, user.organizationPermission?.groupType);
                const handleOnClick = () => handleRoleChange(availableRole);

                return (
                  <DropDownItem key={index} onClick={handleOnClick}>
                    <Typography
                      className={classnames(activeRole && styles.activeRole)}
                      styleType={activeRole ? TextType.LowerCaseLink : TextType.Body}
                    >
                      {t(getAvailableRoleName(availableRole))}
                    </Typography>
                  </DropDownItem>
                );
              })}
            {canRemove && (
              <DropDownItem onClick={handleRemove}>
                <Typography styleType={TextType.LowerCaseLink} className={styles.remove}>
                  {t('msg_label_user_remove_user')}
                </Typography>
              </DropDownItem>
            )}
          </DropDown>
        )}
      </div>
      <Divider className={styles.divider} />
    </div>
  );
};

export default OrganizationUser;
