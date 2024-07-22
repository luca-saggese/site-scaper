import React from 'react';
import { Form } from 'react-final-form';

import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import FormField from '@Components/Form/FormField';
import Select, { SelectStyle } from '@Components/Form/Select';
import TextInput, { TextInputProps } from '@Components/Form/TextInput';
import { ModalProps } from '@Components/Modal';
import Typography, { TextType } from '@Components/Typography';
import { getAvailableRoleDescription, getAvailableRoleName } from '@Config/permissions';
import { ActiveOrganizationFragment, AvailableRoleTypes, useInviteUserMutation } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { composeValidators, email, required } from '@Utils/form';
import { callMutationForForm, mutationErrorHandler } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';

import styles from './InviteUserModalBody.module.scss';

interface InviteUserModalBodyProps extends ModalProps {
  organization: ActiveOrganizationFragment;
}

const InviteUserModalBody: React.FunctionComponent<InviteUserModalBodyProps> = ({ organization, closeModal }) => {
  const t = useTranslation();

  const [inviteUserMutation, { data }] = useInviteUserMutation({
    onError: mutationErrorHandler('msg_error_title_invite_user'),
  });

  return (
    <Form
      initialValues={{
        email: '',
        role: AvailableRoleTypes.Editor,
      }}
      onSubmit={(values) => {
        analytics.track('org_users_invite', { event_location: 'settings' });
        return callMutationForForm(
          inviteUserMutation({
            variables: { input: { email: values.email, invitationRole: values.role } },
          })
        );
      }}
      render={({ handleSubmit, submitting, values }) => {
        if (data) {
          return (
            <div className={styles.container}>
              <Typography className={styles.title} styleType={TextType.LargeBoldHeadline} WrapperElement="div">
                {t('msg_label_invite_user_form_success_title')}
              </Typography>

              <Typography className={styles.infoText} WrapperElement="div">
                {t('msg_label_invite_user_form_success_text')}
              </Typography>

              <Button
                buttonType={ButtonType.Button}
                buttonStyle={ButtonStyle.Secondary}
                buttonColor={ButtonColor.Black}
                onClick={() => {
                  closeModal();
                }}
              >
                <Typography>{t('msg_label_invite_user_form_success_button')}</Typography>
              </Button>
            </div>
          );
        }

        return (
          <form onSubmit={handleSubmit} className={styles.container}>
            <Typography className={styles.title} styleType={TextType.LargeBoldHeadline} WrapperElement="div">
              {t('msg_label_invite_user_form_title')}
            </Typography>

            <Typography className={styles.infoText} WrapperElement="div">
              {t('msg_label_invite_user_form_text', { organizationName: organization.name })}
            </Typography>

            <FormField<TextInputProps<string>>
              name="email"
              label={t('msg_field_label_invite_user_email')}
              className={styles.emailInput}
              component={TextInput}
              validate={composeValidators(required(), email)}
            />

            <div className={styles.roleInputContainer}>
              <FormField
                name="role"
                label={t('msg_field_label_invite_user_role')}
                component={Select}
                selectStyle={SelectStyle.Secondary}
                options={Object.values(AvailableRoleTypes).map((role) => ({
                  value: role,
                  label: t(getAvailableRoleName(role)),
                }))}
                parse={(newValue) => newValue.value}
                format={(value) => ({ value, label: t(getAvailableRoleName(value)) })}
                validate={required()}
              />
              <Typography styleType={TextType.SmallBody} className={styles.roleDescription}>
                {t(getAvailableRoleDescription(values.role))}
              </Typography>
            </div>

            <Button buttonStyle={ButtonStyle.Secondary} buttonColor={ButtonColor.Black} loading={submitting}>
              {t('msg_label_invite_user_form_submit_button')}
            </Button>
          </form>
        );
      }}
    />
  );
};

export default InviteUserModalBody;
