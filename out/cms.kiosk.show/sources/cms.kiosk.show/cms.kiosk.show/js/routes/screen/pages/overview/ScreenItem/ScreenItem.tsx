import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';

import DropDown from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import Icon, { IconSize, IconStyle, IconType } from '@Components/Icon';
import Image from '@Components/Image';
import { useModal } from '@Components/Modal';
import ChromecastHelperModal from '@Components/Modal/ChromecastHelperModal/ChromecastHelperModal';
import ScreenSharingInfoModal from '@Components/Modal/ScreenSharingInfoModal/ScreenSharingInfoModal';
import Placeholder, { PlaceholderColor } from '@Components/Placeholder';
import { ShowPreviewPlaceholder } from '@Components/ShowPreview';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { AspectRatio } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { MeFragment, ScreenDeviceType, ScreenListItemFragment, ScreenRotation } from '@Graphql/graphqlTypes.generated';
import useDimensions from '@Hooks/useDimensions';
import ScreenContentDropdown from '@Routes/screen/components/ScreenContentDropdown';
import analytics from '@Utils/analytics';
import { gqlIdToUuid, noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ScreenItem.module.scss';

export interface ScreenItemProps {
  item: ScreenListItemFragment;
  user?: MeFragment;
  onDeleteOptionClick: (screen: ScreenListItemFragment) => void;
  onRenameOptionClick: (screen: ScreenListItemFragment) => void;
  onRotateOptionClick: (screen: ScreenListItemFragment) => void;
  onToggleScreenInfoOptionClick: (screen: ScreenListItemFragment) => void;
  isChromecastPopoverVisible?: boolean;
  refetchScreens?: () => void;
}

const ScreenItem: React.FunctionComponent<ScreenItemProps> = ({
  item,
  user,
  onDeleteOptionClick,
  onRenameOptionClick,
  onRotateOptionClick,
  onToggleScreenInfoOptionClick,
  isChromecastPopoverVisible = false,
  refetchScreens = noop,
}) => {
  const history = useHistory();
  const t = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(ref);
  const { showModal } = useModal();

  const firstShow = item.subscribedChannel?.shows[0]?.show || item.subscribedShow;

  const height = dimensions.width * AspectRatio.RATIO_16_9;
  const isHorizontal = item.rotation === ScreenRotation.Rotation_0 || item.rotation === ScreenRotation.Rotation_180;
  const canDeleteScreen = !!user?.info.activeOrganization?.permissions.includes('delete_screen');

  const chromecastButton = useRef<HTMLElement>();

  const [chromecastPopover, setChromecastPopover] = useState(isChromecastPopoverVisible);

  // Style the chromecast button
  useEffect(() => {
    if (chromecastButton && chromecastButton.current && chromecastButton.current.shadowRoot) {
      const style = document.createElement('style');
      style.innerHTML = `
      svg path {
        fill: ${item.isOnline ? '#58e4a1' : '#f65858'} !important;
      }
    `;
      chromecastButton.current.shadowRoot.appendChild(style);
    }
  }, [chromecastButton, item.isOnline]);

  const disableScreenSharing = item.isBlocked || !item.isOnline || !item.screensharing;

  return (
    <div className={styles.container} ref={ref} style={{ height }}>
      {firstShow && (
        <div
          className={styles.previewContainer}
          style={{
            width: isHorizontal ? dimensions.width : height * AspectRatio.RATIO_16_9,
          }}
        >
          <Image
            className={styles.preview}
            src={isHorizontal ? firstShow.previewImage : firstShow.previewImageVertical}
            LoadingComponent={<ShowPreviewPlaceholder className={styles.preview} />}
          />
          <div className={styles.previewOverlay} />
        </div>
      )}
      <div className={styles.infoContainer}>
        {item.isBlocked && (
          <Typography
            styleType={TextType.UpperCaseLink}
            color={TextColor.Red}
            WrapperElement="div"
            title={t('msg_screen_blocked_tooltip')}
          >
            {t('msg_screen_blocked')}
          </Typography>
        )}
        <div className={styles.nameContainer}>
          <Typography className={styles.name} styleType={TextType.MediumHeadline} WrapperElement="div">
            {item.name}
          </Typography>
          <div className={classNames(styles.onlineDot, { [styles.active]: item.isOnline })} />
          {item.deviceType === ScreenDeviceType.Chromecast && (
            <Popover
              isOpen={chromecastPopover && !!chromecastButton.current}
              onClickOutside={() => setChromecastPopover(false)}
              positions={['top']}
              containerStyle={{ overflow: 'visible', zIndex: '5' }}
              align="center"
              padding={10}
              content={
                <div className={styles.chromecastPopover}>
                  The connection to the Chromecast is lost - please click here to recast
                </div>
              }
            >
              <div className={styles.chromecastButtonContainer}>
                {item.isOnline && <div className={styles.clickBlocker} />}
                <google-cast-launcher
                  ref={chromecastButton}
                  style={{ cursor: 'pointer' }}
                  onClick={async () => {
                    await showModal({
                      component: ChromecastHelperModal,
                    });
                    refetchScreens();
                  }}
                />
              </div>
            </Popover>
          )}
        </div>

        <ScreenContentDropdown screen={item} />
      </div>

      <button
        className={styles.castScreenButton}
        onClick={() => {
          if (disableScreenSharing) {
            showModal({ component: ScreenSharingInfoModal, props: {} });
          } else {
            analytics.track('screen_share_screen', {
              screen_id: gqlIdToUuid(item.id),
              event_location: 'screen_overview',
            });
            history.push(RouteConfig.ScreenSharing.buildLink({ id: item.id }));
          }
        }}
      >
        <Icon icon={IconType.ShareScreen} iconStyle={IconStyle.None} />
        <Typography>{t('msg_screenshare_option')}</Typography>
      </button>

      <div className={styles.controls}>
        <Icon
          className={styles.previewIcon}
          icon={IconType.Eye}
          size={IconSize.L}
          onClick={() => {
            history.push(RouteConfig.ScreenPreview.buildLink({ id: item.id }));
          }}
        />
        <DropDown
          component={<Icon className={styles.moreIcon} icon={IconType.More} size={IconSize.L} title="Edit screen" />}
        >
          <DropDownItem onClick={() => onRenameOptionClick(item)}>{t('msg_common_rename')}</DropDownItem>
          <DropDownItem onClick={() => onRotateOptionClick(item)}>{t('msg_common_rotate')}</DropDownItem>
          <DropDownItem onClick={() => onToggleScreenInfoOptionClick(item)}>
            {t(item.isScreenInfoVisible ? 'msg_screen_hide_screen_info_option' : 'msg_screen_show_screen_info_option')}
          </DropDownItem>
          {canDeleteScreen && (
            <DropDownItem onClick={() => onDeleteOptionClick(item)}>{t('msg_common_delete')}</DropDownItem>
          )}
        </DropDown>
      </div>
    </div>
  );
};

export const ScreenItemPlaceholder: React.FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(ref);

  const height = dimensions.width * AspectRatio.RATIO_16_9;

  return (
    <div className={styles.container} ref={ref} style={{ height }}>
      <Placeholder className={styles.previewPlaceholder} color={PlaceholderColor.DustyDarkBlue} />
      <div className={styles.infoContainer}>
        <Placeholder className={styles.namePlaceholder} />
        <Placeholder className={styles.selectPlaceholder} />
      </div>
    </div>
  );
};

export default ScreenItem;
