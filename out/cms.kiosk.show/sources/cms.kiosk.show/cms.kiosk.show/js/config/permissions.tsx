import { AvailableRoleTypes, OrganizationXGroupGroupType } from '@Graphql/graphqlTypes.generated';
import { logError } from '@Utils/helpers';

export enum Permission {
  RemoveMember = 'remove_member',
  ChangeRole = 'change_role',
  EditOrganization = 'change_organization',
}

export const getRoleName = (role: OrganizationXGroupGroupType | undefined) => {
  switch (role) {
    case OrganizationXGroupGroupType.Editor:
      return 'msg_role_editor';
    case OrganizationXGroupGroupType.Owner:
      return 'msg_role_owner';
    case OrganizationXGroupGroupType.Admin:
      return 'msg_role_admin';
    default:
      logError(`Role: '${role}' is not defined`);
      return 'msg_role_not_found';
  }
};

export const getAvailableRoleName = (role: AvailableRoleTypes) => {
  switch (role) {
    case AvailableRoleTypes.Editor:
      return 'msg_role_editor';
    case AvailableRoleTypes.Admin:
      return 'msg_role_admin';
    default:
      logError(`Role: '${role}' is not defined`);
      return 'msg_role_not_found';
  }
};

export const getAvailableRoleDescription = (role: AvailableRoleTypes) => {
  switch (role) {
    case AvailableRoleTypes.Editor:
      return 'msg_role_description_editor';
    case AvailableRoleTypes.Admin:
      return 'msg_role_description_admin';
    default:
      logError(`Role: '${role}' is not defined`);
      return 'msg_role_not_found';
  }
};

export const isSameRole = (availableRoleTypes: AvailableRoleTypes, role: OrganizationXGroupGroupType | undefined) => {
  return (
    (availableRoleTypes === AvailableRoleTypes.Editor && role === OrganizationXGroupGroupType.Editor) ||
    (availableRoleTypes === AvailableRoleTypes.Admin && role === OrganizationXGroupGroupType.Admin)
  );
};
