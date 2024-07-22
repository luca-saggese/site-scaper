import React from 'react';

import Avatar from '@Components/Avatar';
import Divider from '@Components/Divider';
import Typography, { TextType } from '@Components/Typography';
import { LocalStorage } from '@Config/constants';
import { useVerifyInvitationKeyQuery } from '@Graphql/graphqlTypes.generated';
import { useTranslation } from '@Utils/i18n';
import { getFromLocalStorage } from '@Utils/localStorage';

import styles from './InviteInfoMessage.module.scss';

const InviteInfoMessage: React.FunctionComponent = () => {
  const t = useTranslation();
  const invitationKey = getFromLocalStorage(LocalStorage.InvitationKey) || '';

  const { data } = useVerifyInvitationKeyQuery({
    variables: {
      invitationKey,
    },
    skip: !invitationKey,
  });

  if (!data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Avatar className={styles.avatar} avatar={data.verifyInvitationKey.organization.avatar} />
        <Typography styleType={TextType.LowerCaseLink}>{data.verifyInvitationKey.organization.name}</Typography>
      </div>
      <Typography WrapperElement="div">
        {t('msg_label_join_organization_info_text', {
          sender: data.verifyInvitationKey.sender.name,
          organizationName: data.verifyInvitationKey.organization.name,
        })}
      </Typography>
      <Divider className={styles.divider} />
    </div>
  );
};

export default InviteInfoMessage;
