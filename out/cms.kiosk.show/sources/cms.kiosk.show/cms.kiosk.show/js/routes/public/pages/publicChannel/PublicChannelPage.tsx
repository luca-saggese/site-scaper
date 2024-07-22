import React, { useEffect, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import Avatar from '@Components/Avatar';
import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import Icon, { IconSize, IconStyle, IconType } from '@Components/Icon';
import Logo from '@Components/Logo';
import SlidesPreview from '@Components/SlidesPreview';
import { toastError } from '@Components/Toastify';
import Typography, { TextColor } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { ChannelPublicFragment, usePublicChannelQuery } from '@Graphql/graphqlTypes.generated';
import useDimensions from '@Hooks/useDimensions';
import { useRouteParams } from '@Hooks/useRouteParams';
import { noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './PublicChannelPage.module.scss';

interface PublicChannelPageViewProps {
  channel: ChannelPublicFragment;
}

const PublicChannelPageView: React.FunctionComponent<PublicChannelPageViewProps> = ({ channel }) => {
  const t = useTranslation();
  const history = useHistory();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(previewRef);

  const onLogoClick = () => {
    history.push(RouteConfig.Home.buildLink());
  };

  useEffect(() => {
    const previewElem = previewRef.current;

    if (!previewElem) return noop;

    let timer: NodeJS.Timeout;
    const svg = previewElem.querySelector('svg');

    const handleMouseMove = () => {
      if (timer) clearTimeout(timer);
      if (svg) svg.style.opacity = '1';

      timer = setTimeout(() => {
        if (svg) svg.style.opacity = '0';
      }, 3000);
    };
    previewElem.addEventListener('mousemove', handleMouseMove);
    return () => {
      previewElem.removeEventListener('mousemove', handleMouseMove);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const onFullScreenClick = () => {
    const elem = previewRef.current;
    if (!elem) {
      return;
    }

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullscreen) {
      elem.mozRequestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };

  const onFullScreenExit = () => {
    document.exitFullscreen();
  };

  const onForkShowClick = () => {
    history.push(RouteConfig.PublicChannelFork.buildLink({ publicId: channel.publicId }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.kioskInfo}>
          <Logo className={styles.logo} onClick={onLogoClick} />
          <Typography color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_kiosk_moto')}
          </Typography>
        </div>
        <div className={styles.headerButtons}>
          <Button
            buttonType={ButtonType.Button}
            buttonStyle={ButtonStyle.Text}
            buttonColor={ButtonColor.White}
            onClick={onForkShowClick}
          >
            <Icon icon={IconType.Fork} className={styles.headerButtonIcon} iconStyle={IconStyle.None} />
            {t('msg_public_channel_fork_button')}
          </Button>
          <Button
            buttonType={ButtonType.Button}
            buttonStyle={ButtonStyle.Text}
            buttonColor={ButtonColor.White}
            onClick={onFullScreenClick}
          >
            <Icon icon={IconType.FullScreen} className={styles.headerButtonIcon} iconStyle={IconStyle.None} />
            {t('msg_common_full_screen')}
          </Button>
        </div>
      </div>
      <div className={styles.previewContainer} ref={previewRef}>
        <div className={styles.fullscreenOver} />
        <SlidesPreview
          slides={channel.shows.flatMap((showNode) => showNode.show.slides)}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
        />
        <Icon
          icon={IconType.Close}
          className={styles.fullScreenIcon}
          iconStyle={IconStyle.Secondary}
          size={IconSize.XXL}
          onClick={onFullScreenExit}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.channelInfo}>
          <Typography WrapperElement="div">{channel.name}</Typography>
          <Typography color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_public_channel_views_count', { count: channel.publicViewCount })}
          </Typography>
        </div>
        <div className={styles.madeByMessage}>
          <Typography color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_public_channel_made_by')}
          </Typography>
          <Avatar avatar={channel.createdBy.avatar} className={styles.avatar} />
          <Typography WrapperElement="div">{channel.createdBy.name}</Typography>
          <Typography color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_public_channel_from')}
          </Typography>
          <Avatar avatar={channel.organization.avatar} className={styles.avatar} />
          <Typography WrapperElement="div">{channel.organization.name}</Typography>
        </div>
      </div>
    </div>
  );
};

const PublicChannelPage = () => {
  const { publicId } = useRouteParams(RouteConfig.PublicChannel);

  const { data, error } = usePublicChannelQuery({ fetchPolicy: 'network-only', variables: { publicId } });

  if (error) {
    toastError('msg_error_title_channel', 'msg_error_loading_channel');
    return <Redirect to={RouteConfig.Home.buildLink()} />;
  }

  if (!data?.channelPublic) {
    return null;
  }

  return <PublicChannelPageView channel={data.channelPublic} />;
};

export default PublicChannelPage;
