import classnames from 'classnames';
import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import Link from '@Components/Link';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { useTranslation } from '@Utils/i18n';

import styles from './NavigationBarLinks.module.scss';

interface NavigationBarLink {
  text: string;
  className: string;
  activeClassName: string;
  firstLetterClassName: string;
  link: string;
}

const NavigationBar: React.FunctionComponent = () => {
  const t = useTranslation();
  const location = useLocation();

  const links: NavigationBarLink[] = [
    {
      link: RouteConfig.Screens.buildLink(),
      activeClassName: styles.active,
      className: styles.screens,
      firstLetterClassName: styles.screensFirstLetter,
      text: t('msg_nav_link_screen'),
    },
    {
      link: RouteConfig.Channels.buildLink(),
      activeClassName: styles.active,
      className: styles.channels,
      firstLetterClassName: styles.channelsFirstLetter,
      text: t('msg_nav_link_channel'),
    },
    {
      link: RouteConfig.Shows.buildLink(),
      activeClassName: styles.active,
      className: styles.shows,
      firstLetterClassName: styles.showsFirstLetter,
      text: t('msg_nav_link_show'),
    },
  ];

  return (
    <div className={styles.container}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.link}
          className={classnames(styles.item, link.className, {
            [link.activeClassName]: matchPath(location.pathname, link.link),
          })}
        >
          <div>
            <Typography styleType={TextType.UpperCaseLink}>{link.text}</Typography>
            <div className={classnames(styles.firstLetterBorder, link.firstLetterClassName)} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
