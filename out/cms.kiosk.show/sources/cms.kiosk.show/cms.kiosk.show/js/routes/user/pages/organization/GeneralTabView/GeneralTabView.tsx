import classnames from 'classnames';
import React from 'react';

import Avatar from '@Components/Avatar';
import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import AutoSaveForm from '@Components/Form/AutoSaveForm';
import { IconType } from '@Components/Icon';
import { useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import OrganizationAvatarUploadModalBody from '@Components/Modal/OrganizationAvatarUploadModalBody';
import Typography, { TextType } from '@Components/Typography';
import { Permission } from '@Config/permissions';
import {
  ActiveOrganizationInfoFragment,
  MeDocument,
  UpdateOrganizationDocument,
  useUserLeaveOrganizationMutation,
} from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { mutationErrorHandler } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';

import styles from './GeneralTabView.module.scss';

interface GeneralTabViewInterface {
  activeOrganization: ActiveOrganizationInfoFragment;
}

const GeneralTabView: React.FunctionComponent<GeneralTabViewInterface> = ({ activeOrganization }) => {
  const t = useTranslation();
  const { showModal } = useModal();

  const canEditOrganizationDetails = activeOrganization.permissions.includes(Permission.EditOrganization);

  const [leaveOrganizationMutation] = useUserLeaveOrganizationMutation({
    refetchQueries: [{ query: MeDocument }],
    onError: mutationErrorHandler('msg_error_title_leave_organization'),
  });

  const handleAvatarClick = () => {
    if (!canEditOrganizationDetails) {
      return;
    }

    showModal({ component: OrganizationAvatarUploadModalBody });
  };

  const handleLeaveOrganizationClick = async (organizationId: string) => {
    const { action } = await showModal({
      component: ConfirmationModalBody,
      props: {
        confirmButton: {
          color: ButtonColor.Blue,
          label: t('msg_label_leave_organization_modal_confirm_button_label'),
        },
        cancelButton: {
          color: ButtonColor.Black,
          label: t('msg_label_leave_organization_modal_cancel_button_label'),
        },
        content: (
          <Typography>
            {t('msg_label_leave_organization_modal_text', {
              organizationName: activeOrganization.organization.name,
            })}
          </Typography>
        ),
      },
    });

    if (action !== 'CONFIRM') {
      return;
    }

    analytics.track('org_leave', {
      event_location: 'settings',
    });

    leaveOrganizationMutation({ variables: { input: { organizationId } } });
  };

  return (
    <>
      <Typography styleType={TextType.LargeBoldHeadline} className={styles.header} WrapperElement="div">
        {t('msg_sidebar_organization_general')}
      </Typography>
      <div>
        <div className={styles.field}>
          <Typography className={styles.label} styleType={TextType.TinyHeadline} WrapperElement="div">
            {t('msg_label_profile_picture')}
          </Typography>
          <Avatar
            className={classnames(styles.avatar, { [styles.disabled]: !canEditOrganizationDetails })}
            avatar={activeOrganization.organization.avatar}
            onClick={handleAvatarClick}
          />
        </div>
        <div className={styles.field}>
          <AutoSaveForm
            mutation={UpdateOrganizationDocument}
            label={t('msg_field_label_organization_name')}
            name="name"
            staticFormValues={{ id: activeOrganization.organization.id }}
            initialValues={{ name: activeOrganization.organization.name }}
            icon={IconType.Pencil}
            disabled={!canEditOrganizationDetails}
            onComplete={() => {
              analytics.track('org_rename', {
                event_location: 'settings',
              });
            }}
          />
        </div>
        <div className={styles.field}>
          <Button
            buttonType={ButtonType.Button}
            buttonTextStyle={TextType.LowerCaseLink}
            buttonColor={ButtonColor.White}
            buttonStyle={ButtonStyle.Text}
            onClick={() => handleLeaveOrganizationClick(activeOrganization.organization.id)}
          >
            {t('msg_label_leave_organization')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default GeneralTabView;
