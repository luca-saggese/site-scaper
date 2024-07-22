import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import DropDown from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import Icon, { IconSize, IconType } from '@Components/Icon';
import { useModal } from '@Components/Modal';
import NotificationModalBody from '@Components/Modal/NotificationModalBody';
import Placeholder from '@Components/Placeholder';
import ShowPreview, { ShowPreviewPlaceholder } from '@Components/ShowPreview';
import { toastError } from '@Components/Toastify';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import {
  MeFragment,
  ShowHtmlDocument,
  ShowHtmlQuery,
  ShowHtmlQueryVariables,
  ShowListItemFragment,
} from '@Graphql/graphqlTypes.generated';
import AddToDropdown from '@Routes/show/pages/editor/AddToDropdown';
import graphqlClient from '@Utils/graphqlClient';
import { formatTime } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';
import { show2Gif, show2Mp4 } from '@Utils/share-media';

import styles from './ShowItem.module.scss';

async function getShowHtml(id: string) {
  const result = await graphqlClient.query<ShowHtmlQuery, ShowHtmlQueryVariables>({
    query: ShowHtmlDocument,
    variables: { id },
    fetchPolicy: 'network-only',
  });
  return result.data;
}

export interface ShowItemProps {
  item: ShowListItemFragment;
  user?: MeFragment;
  onRenameOptionClick: (show: ShowListItemFragment) => void;
  onDeleteOptionClick: (show: ShowListItemFragment) => void;
  onDuplicateOptionClick: (show: ShowListItemFragment) => void;
}

const ShowItem: React.FunctionComponent<ShowItemProps> = ({
  item,
  user,
  onRenameOptionClick,
  onDeleteOptionClick,
  onDuplicateOptionClick,
}) => {
  const history = useHistory();
  const t = useTranslation();
  const { showModal, closeModal } = useModal();

  const canDownloadMedia = useMemo(() => {
    if (!user) {
      return false;
    }
    return user.info.email.includes('founders.as') || user.info.email.includes('kiosk.show');
  }, [user]);

  const handleOnShowClick = (id: string) => {
    history.push({ pathname: RouteConfig.ShowEditor.buildLink({ id }), search: history.location.search });
  };

  const downloadGif = async (show: ShowListItemFragment) => {
    showModal({
      component: NotificationModalBody,
      props: {
        text: t('msg_download_show_as_gif_loading'),
      },
      closeable: false,
    });

    try {
      const showData = await getShowHtml(show.id);
      await show2Gif(showData);
    } catch (error) {
      toastError('msg_download_show_as_gif_error_title', 'msg_download_show_as_gif_error_text');
    } finally {
      closeModal();
    }
  };

  const downloadMp4 = async (show: ShowListItemFragment) => {
    showModal({
      component: NotificationModalBody,
      props: {
        text: t('msg_download_show_as_video_loading'),
      },
      closeable: false,
    });

    try {
      const showData = await getShowHtml(show.id);
      await show2Mp4(showData);
    } catch (error) {
      toastError('msg_download_show_as_video_error_title', 'msg_download_show_as_video_error_text');
    } finally {
      closeModal();
    }
  };

  return (
    <div className={styles.container}>
      <ShowPreview item={item} onClick={() => handleOnShowClick(item.id)} />
      <div>
        <div className={styles.infoContainer}>
          <div className={styles.showInfoContainer} onClick={() => handleOnShowClick(item.id)}>
            <Typography className={styles.showName} styleType={TextType.RegularHeadline} WrapperElement="div">
              {item.name}
            </Typography>
          </div>
          <div className={styles.controls}>
            <Icon
              className={styles.previewIcon}
              icon={IconType.Eye}
              size={IconSize.L}
              onClick={() => {
                history.push(RouteConfig.ShowPreview.buildLink({ id: item.id }));
              }}
            />
            <DropDown
              component={<Icon className={styles.moreIcon} icon={IconType.More} size={IconSize.L} title="Edit show" />}
            >
              <DropDownItem onClick={() => onRenameOptionClick(item)}>{t('msg_common_rename')}</DropDownItem>
              <DropDownItem onClick={() => onDuplicateOptionClick(item)}>{t('msg_common_duplicate')}</DropDownItem>
              <DropDownItem onClick={() => onDeleteOptionClick(item)}>{t('msg_common_delete')}</DropDownItem>
              {canDownloadMedia && (
                <>
                  <DropDownItem onClick={() => downloadGif(item)}>{t('msg_download_show_as_gif')}</DropDownItem>
                  <DropDownItem onClick={() => downloadMp4(item)}>{t('msg_download_show_as_video')}</DropDownItem>
                </>
              )}
            </DropDown>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <Typography color={TextColor.LightFadedBlue}>{formatTime(item.duration)}</Typography>
          <div className={styles.controls}>
            <AddToDropdown showId={item.id} eventLocation="show_overview" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShowItemPlaceholder: React.FunctionComponent = () => (
  <div className={styles.container}>
    <ShowPreviewPlaceholder />
    <div className={styles.infoContainer}>
      <div>
        <Placeholder className={styles.showNamePlaceholder} />
      </div>
    </div>
  </div>
);

export default ShowItem;
