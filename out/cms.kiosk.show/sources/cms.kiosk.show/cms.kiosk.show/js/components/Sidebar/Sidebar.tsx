import classnames from 'classnames';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Link from '@Components/Link';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { useTranslation } from '@Utils/i18n';

import styles from './Sidebar.module.scss';

export interface SidebarProps {
  className?: string;
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({ className }) => {
  const t = useTranslation();
  const match = useRouteMatch;

  return (
    <div className={classnames(className, styles.container)}>
      <div className={styles.item}>
        <Link
          to={RouteConfig.UserSettings.buildLink()}
          active={!!match({ path: RouteConfig.UserSettings.buildLink() })}
        >
          <Typography styleType={TextType.LowerCaseLink}>{t('msg_sidebar_user_settings')}</Typography>
        </Link>
      </div>
      <div className={styles.item}>
        <Link to={RouteConfig.OrganizationSettings.buildLink()}>
          <Typography styleType={TextType.LowerCaseLink}>{t('msg_sidebar_organization_settings')}</Typography>
        </Link>
        <Link
          to={RouteConfig.OrganizationSettingsGeneral.buildLink()}
          className={styles.subItem}
          active={!!match({ path: RouteConfig.OrganizationSettingsGeneral.buildLink() })}
        >
          <Typography
            WrapperElement="div"
            styleType={
              match({ path: RouteConfig.OrganizationSettingsGeneral.buildLink() })
                ? TextType.LowerCaseLink
                : TextType.Body
            }
          >
            {t('msg_sidebar_organization_general')}
          </Typography>
        </Link>
        <Link
          to={RouteConfig.OrganizationSettingsUsers.buildLink()}
          className={styles.subItem}
          active={!!match({ path: RouteConfig.OrganizationSettingsUsers.buildLink() })}
        >
          <Typography
            WrapperElement="div"
            styleType={
              match({ path: RouteConfig.OrganizationSettingsUsers.buildLink() })
                ? TextType.LowerCaseLink
                : TextType.Body
            }
          >
            {t('msg_sidebar_organization_users')}
          </Typography>
        </Link>
        <Link
          to={RouteConfig.OrganizationSettingsIntegrations.buildLink()}
          className={styles.subItem}
          active={!!match({ path: RouteConfig.OrganizationSettingsIntegrations.buildLink() })}
        >
          <Typography
            WrapperElement="div"
            styleType={
              match({ path: RouteConfig.OrganizationSettingsIntegrations.buildLink() })
                ? TextType.LowerCaseLink
                : TextType.Body
            }
          >
            {t('msg_sidebar_organization_integrations')}
          </Typography>
        </Link>
      </div>
      <div className={styles.item}>
        <Link to={RouteConfig.SetupOrganization.buildLink()}>
          <Typography styleType={TextType.LowerCaseLink}>{t('msg_sidebar_create_organization')}</Typography>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
