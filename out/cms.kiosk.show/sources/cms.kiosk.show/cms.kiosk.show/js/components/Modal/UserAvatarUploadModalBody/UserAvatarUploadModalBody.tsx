import React from 'react';

import { ModalProps } from '@Components/Modal';
import UploadAvatar from '@Components/UploadAvatar';
import { UserInfoFragment, useUserAvatarUploadMutation } from '@Graphql/graphqlTypes.generated';
import 'rc-slider/assets/index.css';
import analytics from '@Utils/analytics';
import { gqlIdToUuid } from '@Utils/helpers';

export interface UserAvatarUploadModalBodyProps extends ModalProps {
  user: UserInfoFragment;
}

const UserAvatarUploadModalBody: React.FunctionComponent<UserAvatarUploadModalBodyProps> = ({ user, closeModal }) => {
  const [updateUserAvatar, updateUserAvatarResult] = useUserAvatarUploadMutation({
    onCompleted: () => closeModal(),
  });

  const handleCancelClick = () => closeModal();

  const handleAvatarSave = (blob: Blob) => {
    analytics.track('user_change_avatar', {
      user_id: gqlIdToUuid(user.id),
      event_location: 'settings',
    });
    return updateUserAvatar({
      variables: {
        input: {
          avatar: blob,
        },
      },
    });
  };

  return (
    <UploadAvatar
      saveInProgress={updateUserAvatarResult.loading}
      onAvatarSave={handleAvatarSave}
      onCancel={handleCancelClick}
    />
  );
};

export default UserAvatarUploadModalBody;
