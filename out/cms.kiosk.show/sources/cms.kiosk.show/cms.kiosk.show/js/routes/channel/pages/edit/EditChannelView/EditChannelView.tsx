import React from 'react';
import { FormRenderProps } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useHistory } from 'react-router-dom';

import AutosaveBadge from '@Components/AutosaveBadge';
import Badge from '@Components/Badge';
import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import DropDown from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import EmojiPicker from '@Components/EmojiPicker';
import AutosizeTextInput, { AutosizeTextInputProps } from '@Components/Form/AutosizeTextInput';
import FormField from '@Components/Form/FormField';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import ContentBox from '@Components/Layout/ContentBox/ContentBox';
import MainPageLayout from '@Components/Layout/MainPageLayout';
import NavigationBarClose from '@Components/Layout/NavigationBar/components/NavigationBarClose';
import NavigationBarPageDetails from '@Components/Layout/NavigationBar/components/NavigationBarPageDetails';
import FormNavigationBar from '@Components/Layout/NavigationBar/FormNavigationBar';
import { useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import ShareChannelModalBody from '@Components/Modal/ShareChannelModalBody';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { TITLE_MAX_LENGTH } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  ChannelFragment,
  useDeleteChannelMutation,
  useDuplicateChannelMutation,
} from '@Graphql/graphqlTypes.generated';
import ShowingOnScreenSelect from '@Routes/channel/components/ShowingOnScreenSelect/ShowingOnScreenSelect';
import { ChannelEditFormValues } from '@Routes/channel/pages/edit';
import ChannelShowList from '@Routes/channel/pages/edit/ChannelShowList';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { limitLength, required } from '@Utils/form';
import { mutationErrorHandler } from '@Utils/graphql';
import { formatTime, gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './EditChannelView.module.scss';

interface EditChannelViewProps {
  channel: ChannelFragment;
  formProps: FormRenderProps<ChannelEditFormValues>;
  onAddShowClick: () => void;
  onChannelPreviewClick: () => void;
}

const EditChannelView: React.FunctionComponent<EditChannelViewProps> = ({
  channel,
  formProps: { values, submitting },
  onAddShowClick,
  onChannelPreviewClick,
}) => {
  const t = useTranslation();
  const history = useHistory();
  const { showModal } = useModal();

  const { id } = channel;

  const [deleteChannel] = useDeleteChannelMutation({
    onError: mutationErrorHandler('msg_error_title_saving_channel'),
    onCompleted: () => {
      analytics.track('channel_delete', {
        channel_id: gqlIdToUuid(id),
        event_location: 'channel_editor',
      });
      history.replace(RouteConfig.Channels.buildLink());
    },
  });

  const [duplicateChannelMutation] = useDuplicateChannelMutation({
    onError: mutationErrorHandler('msg_error_title_saving_channel'),
    onCompleted: (response) => {
      const newId = response.duplicateChannel.channel?.id;
      assertIsDefined(newId);
      analytics.track('channel_duplicate', {
        channel_id: gqlIdToUuid(id),
        event_location: 'channel_editor',
      });
      history.push(RouteConfig.ChannelEdit.buildLink({ id: newId }));
    },
  });

  const handleDuplicateOptionClick = () => {
    duplicateChannelMutation({ variables: { input: { channelId: id } } });
  };

  const handleDeleteOptionClick = async () => {
    const { action } = await showModal({
      component: ConfirmationModalBody,
      props: {
        confirmButton: {
          color: ButtonColor.Red,
          label: t('msg_label_channel_edit_page_delete_modal_confirm_button_label'),
        },
        cancelButton: {
          color: ButtonColor.Black,
          label: t('msg_label_channel_edit_page_delete_modal_cancel_button_label'),
        },
        content: <Typography>{t('msg_label_channel_edit_page_delete_modal_text', { name: values.name })}</Typography>,
      },
    });

    if (action === 'CONFIRM') {
      deleteChannel({ variables: { input: { id } } });
    }
  };

  const onShareButtonClick = () => {
    showModal({
      component: ShareChannelModalBody,
      props: {
        channel,
      },
    });
  };

  return (
    <MainPageLayout
      NavigationBarComponent={
        <FormNavigationBar>
          <div className={styles.navigationFields}>
            <div className={styles.leftNavigationSection}>
              <NavigationBarPageDetails pageDetails={t('msg_nav_channel_editor')} />
              <AutosaveBadge isSaving={submitting} />
            </div>
            <div className={styles.rightNavigationSection}>
              <Button
                buttonType={ButtonType.Button}
                buttonStyle={ButtonStyle.Text}
                buttonColor={ButtonColor.White}
                onClick={onChannelPreviewClick}
              >
                <Icon icon={IconType.Eye} className={styles.previewIcon} iconStyle={IconStyle.None} />
                <span>{t('msg_nav_text_preview')}</span>
              </Button>
              <Button
                buttonType={ButtonType.Button}
                buttonStyle={ButtonStyle.Text}
                buttonColor={ButtonColor.White}
                onClick={onShareButtonClick}
              >
                <Icon icon={IconType.Share} className={styles.shareIcon} iconStyle={IconStyle.None} />
                {channel.isPublic ? <Badge>{t('msg_common_public')}</Badge> : <span>{t('msg_common_share')}</span>}
              </Button>
              <NavigationBarClose
                title={t('msg_close_channel_editor_title')}
                onClose={() => history.push(RouteConfig.Channels.buildLink())}
              />
            </div>
          </div>
        </FormNavigationBar>
      }
      FooterComponent={
        <div className={styles.bottomContainer}>
          <div className={styles.channelDuration}>
            <Typography styleType={TextType.TinyHeadline} color={TextColor.LightFadedBlue}>
              {t('msg_label_channel_duration')}
            </Typography>
            <Typography>{formatTime(values.shows.reduce((sum, show) => sum + show.duration, 0))}</Typography>
          </div>
        </div>
      }
    >
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div>
            <div className={styles.emoji}>
              <FormField name="emoji" component={EmojiPicker} />
            </div>
            <FormField<AutosizeTextInputProps>
              className={styles.field}
              name="name"
              placeholder={t('msg_label_channel_create_page_name_placeholder')}
              validate={required('msg_error_create_channel_name_required')}
              component={AutosizeTextInput}
              onFocus={(event) => {
                event.target.select();
              }}
              format={limitLength(TITLE_MAX_LENGTH)}
            />
            <ShowingOnScreenSelect channelId={id} eventLocation="channel_editor" />
          </div>
          <div className={styles.topControls}>
            <Button className={styles.addShowButton} onClick={onAddShowClick}>
              {t('msg_label_channel_edit_page_add_show_button')}
            </Button>
            <DropDown component={<Icon icon={IconType.More} />}>
              <DropDownItem onClick={handleDeleteOptionClick}>
                {t('msg_label_channel_edit_page_delete_option')}
              </DropDownItem>
              <DropDownItem onClick={handleDuplicateOptionClick}>
                {t('msg_label_channel_edit_page_duplicate_option')}
              </DropDownItem>
            </DropDown>
          </div>
        </div>
        <ContentBox className={styles.showsContainer}>
          <FieldArray name="shows" component={ChannelShowList} channelId={id} />
        </ContentBox>
      </div>
    </MainPageLayout>
  );
};

export default EditChannelView;
