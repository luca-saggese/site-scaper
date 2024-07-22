import React from 'react';

import { ModalProps } from '@Components/Modal';
import UploadAvatar from '@Components/UploadAvatar';
import { MeDocument, useUpdateOrganizationAvatarMutation } from '@Graphql/graphqlTypes.generated';
import 'rc-slider/assets/index.css';
import analytics from '@Utils/analytics';

const OrganizationAvatarUploadModalBody: React.FunctionComponent<ModalProps> = ({ closeModal }) => {
  const [updateOrganizationAvatar, updateOrganizationAvatarResult] = useUpdateOrganizationAvatarMutation({
    onCompleted: () => closeModal(),
    refetchQueries: [{ query: MeDocument }],
  });

  const handleCancelClick = () => closeModal();

  const handleAvatarSave = (blob: Blob) => {
    analytics.track('org_change_avatar', { event_location: 'settings' });
    return updateOrganizationAvatar({
      variables: {
        input: {
          avatar: blob,
        },
      },
    });
  };

  return (
    <UploadAvatar
      saveInProgress={updateOrganizationAvatarResult.loading}
      onAvatarSave={handleAvatarSave}
      onCancel={handleCancelClick}
    />
  );
};

export default OrganizationAvatarUploadModalBody;
