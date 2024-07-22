import classnames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '@Components/Avatar';
import Divider from '@Components/Divider';
import DropDown from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import Typography, { TextType } from '@Components/Typography';
import { LocalStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { MeDocument, useChangeActiveOrganizationMutation, useMeQuery } from '@Graphql/graphqlTypes.generated';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNodes } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';
import { deleteFromLocalStorage } from '@Utils/localStorage';

import styles from './NavigationBarSettings.module.scss';

interface NavigationBarSettingsComponentProps {}

const NavigationBarSettings: React.FunctionComponent<NavigationBarSettingsComponentProps> = () => {
  const history = useHistory();
  const t = useTranslation();
  const { data } = useMeQuery();

  const [changeActiveOrganization] = useChangeActiveOrganizationMutation({
    refetchQueries: [{ query: MeDocument }],
    onError: mutationErrorHandler('msg_error_changing_active_organization'),
  });

  const organizations = getNodes(data?.me.organizations.edges);

  const onUserSettingsClick = () => {
    history.push(RouteConfig.UserSettings.buildLink());
  };

  const onLogoutClick = () => {
    deleteFromLocalStorage(LocalStorage.UserToken);
  };

  const onCurrentOrganizationIconClick = () => {
    if (organizations.length > 1) {
      return;
    }
    history.push(RouteConfig.OrganizationSettings.buildLink());
  };

  const onOrganizationSettingsClick = () => {
    history.push(RouteConfig.OrganizationSettings.buildLink());
  };

  const onHelpClick = () => {
    window.open('https://support.kiosk.show', '_blank');
  };

  return (
    <div className={classnames(styles.container)}>
      <DropDown
        className={classnames(styles.dropdown)}
        contentClassName={styles.dropdownItems}
        component={
          <Avatar
            onClick={onCurrentOrganizationIconClick}
            avatar={data?.me.info.activeOrganization?.organization.avatar}
            title="Organization dropdown"
          />
        }
      >
        {organizations.length > 1 && (
          <>
            {organizations.map((org) => (
              <DropDownItem
                key={org.id}
                onClick={() => {
                  changeActiveOrganization({ variables: { input: { orgXGroup: org.id } } });
                }}
                className={classnames(styles.dropdownItem, styles.organizationOption)}
              >
                <Avatar avatar={org.organization.avatar} />
                {data?.me.info.activeOrganization?.id === org.id ? (
                  <Typography styleType={TextType.LowerCaseLink} className={styles.activeOrganizationOption}>
                    {org.organization.name}
                  </Typography>
                ) : (
                  <Typography>{org.organization.name}</Typography>
                )}
              </DropDownItem>
            ))}
            <Divider className={styles.dropdownDivider} />
            <DropDownItem className={styles.dropdownItem} onClick={onOrganizationSettingsClick}>
              <Typography>{t('msg_nav_link_settings')}</Typography>
            </DropDownItem>
          </>
        )}
      </DropDown>
      <DropDown
        className={classnames(styles.dropdown)}
        contentClassName={styles.dropdownItems}
        component={<Avatar avatar={data?.me.info.avatar} title="User dropdown" />}
      >
        <DropDownItem className={classnames(styles.dropdownItem, styles.userNameDropdownItem)} closeOnClick={false}>
          <Typography className={styles.userName} styleType={TextType.LowerCaseLink} WrapperElement="div">
            {data?.me.info.name}
          </Typography>
        </DropDownItem>
        <DropDownItem className={styles.dropdownItem} onClick={onUserSettingsClick}>
          <Typography>{t('msg_nav_link_settings')}</Typography>
        </DropDownItem>
        <DropDownItem className={styles.dropdownItem} onClick={onHelpClick}>
          <Typography>{t('msg_nav_link_help')}</Typography>
        </DropDownItem>
        <DropDownItem className={styles.dropdownItem} onClick={onLogoutClick}>
          <Typography>{t('msg_nav_link_log_out')}</Typography>
        </DropDownItem>
      </DropDown>
    </div>
  );
};

export default NavigationBarSettings;
