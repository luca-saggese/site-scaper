import classnames from 'classnames';
import React, { useState } from 'react';
import { Form } from 'react-final-form';

import Avatar from '@Components/Avatar';
import AutoSaveForm from '@Components/Form/AutoSaveForm/AutoSaveForm';
import FormField from '@Components/Form/FormField';
import Toggle, { ToggleProps } from '@Components/Form/Toggle';
import Icon, { IconType } from '@Components/Icon';
import LabeledText from '@Components/LabeledText';
import Link from '@Components/Link';
import { useModal } from '@Components/Modal';
import UserAvatarUploadModalBody from '@Components/Modal/UserAvatarUploadModalBody';
import { toastError } from '@Components/Toastify';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { UpdateUserDocument, useMeQuery, useUpdateUserMutation } from '@Graphql/graphqlTypes.generated';
import { useEventHandler } from '@Hooks/useEventHandler';
import SettingsLayout from '@Routes/user/pages/shared/SettingsLayout';
import analytics from '@Utils/analytics';
import { gqlIdToUuid, noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './UserSettingsPage.module.scss';

const UserSettingsPage: React.FunctionComponent = () => {
  const { showModal } = useModal();
  const [hovered, setHovered] = useState(false);
  const ref = useEventHandler(
    'mouseover',
    () => setHovered(true),
    () => setHovered(false)
  );
  const { data, loading, error } = useMeQuery();
  const t = useTranslation();
  const [updateUserMutation] = useUpdateUserMutation();

  if (error) {
    toastError('msg_error_title_loading_user_settings', 'msg_error_loading_user_settings');
  }

  const handleAvatarClick = () => {
    if (!data) {
      return;
    }

    showModal({
      component: UserAvatarUploadModalBody,
      props: {
        user: data.me.info,
      },
    });
  };

  return (
    <SettingsLayout>
      {!loading && data?.me && (
        <>
          <div className={styles.header}>
            <Avatar className={styles.avatar} avatar={data.me.info.avatar} onClick={handleAvatarClick} />
            <Typography styleType={TextType.LargeBoldHeadline} WrapperElement="h2">
              {t('msg_label_welcome_user', { name: data.me.info.name })}
            </Typography>
          </div>
          <div className={styles.details}>
            <div className={styles.field}>
              <AutoSaveForm
                mutation={UpdateUserDocument}
                name="name"
                label={t('msg_field_label_user_name')}
                initialValues={{ name: data.me.info.name }}
                staticFormValues={{ id: data.me.info.id }}
                icon={IconType.Pencil}
                inputClassName={styles.autoSaveInput}
                onComplete={() => {
                  analytics.track('user_rename', {
                    user_id: gqlIdToUuid(data.me.info.id),
                    event_location: 'settings',
                  });
                }}
              />
            </div>
            {data.me.info.email && (
              <div className={classnames(styles.field, styles.email)}>
                <LabeledText label={t('msg_field_label_email')}>
                  <Typography>{data.me.info.email}</Typography>
                </LabeledText>
              </div>
            )}
            <div className={styles.field}>
              <Form
                initialValues={{ newsletterOptIn: data.me.info.newsletterOptIn }}
                onSubmit={noop}
                render={() => (
                  <FormField<ToggleProps>
                    name="newsletterOptIn"
                    component={Toggle}
                    onChange={(newValue) => {
                      updateUserMutation({
                        variables: {
                          input: { id: data.me.info.id, name: data.me.info.name, newsletterOptIn: newValue },
                        },
                      });
                    }}
                    type="checkbox"
                    label={t('msg_field_label_newsletter_opt_in')}
                  />
                )}
              />
            </div>
            <div className={classnames(styles.field, styles.password)} ref={ref}>
              <LabeledText label={t('msg_field_label_password')}>
                <Link to={RouteConfig.ResetPassword.buildLink()}>
                  <Typography styleType={TextType.LowerCaseLink}>{t('msg_label_change_password')}</Typography>
                </Link>
              </LabeledText>
              {hovered && <Icon icon={IconType.Pencil} disabled={true} />}
            </div>
          </div>
        </>
      )}
    </SettingsLayout>
  );
};

export default UserSettingsPage;
