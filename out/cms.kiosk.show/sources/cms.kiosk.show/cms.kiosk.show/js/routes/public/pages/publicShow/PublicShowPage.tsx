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
import { ShowPublicFragment, usePublicShowQuery } from '@Graphql/graphqlTypes.generated';
import useDimensions from '@Hooks/useDimensions';
import { useRouteParams } from '@Hooks/useRouteParams';
import { noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './PublicShowPage.module.scss';

interface PublicShowPageViewProps {
  show: ShowPublicFragment;
}

const PublicShowPageView: React.FunctionComponent<PublicShowPageViewProps> = ({ show }) => {
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

  const onForkShowClick = () => {
    history.push(RouteConfig.PublicShowFork.buildLink({ publicId: show.publicId }));
  };

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
            {t('msg_public_show_fork_button')}
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
        <SlidesPreview slides={show.slides} containerWidth={dimensions.width} containerHeight={dimensions.height} />
        <Icon
          icon={IconType.Close}
          className={styles.fullScreenIcon}
          iconStyle={IconStyle.Secondary}
          size={IconSize.XXL}
          onClick={onFullScreenExit}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.showInfo}>
          <Typography WrapperElement="div">{show.name}</Typography>
          <Typography color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_public_show_views_count', { count: show.publicViewCount })}
          </Typography>
        </div>
        <div className={styles.madeByMessage}>
          <Typography color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_public_show_made_by')}
          </Typography>
          <Avatar avatar={show.createdBy.avatar} className={styles.avatar} />
          <Typography WrapperElement="div">{show.createdBy.name}</Typography>
          <Typography color={TextColor.DarkGrey} WrapperElement="div">
            {t('msg_public_show_from')}
          </Typography>
          <Avatar avatar={show.organization.avatar} className={styles.avatar} />
          <Typography WrapperElement="div">{show.organization.name}</Typography>
        </div>
      </div>
    </div>
  );
};

const PublicShowPage = () => {
  const { publicId } = useRouteParams(RouteConfig.PublicShow);

  const { data, error } = usePublicShowQuery({ fetchPolicy: 'network-only', variables: { publicId } });

  if (error) {
    toastError('msg_error_title_loading_show', 'msg_error_loading_show');
    return <Redirect to={RouteConfig.Home.buildLink()} />;
  }

  if (!data?.showPublic) {
    return null;
  }

  return <PublicShowPageView show={data.showPublic} />;
};

export default PublicShowPage;
