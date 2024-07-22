import classNames from 'classnames';
import React, { useEffect } from 'react';

import Typography, { TextColor, TextType } from '@Components/Typography';
import { ScreenFragment, useSendPusherMessageMutation } from '@Graphql/graphqlTypes.generated';
import { mutationErrorHandler } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';

import styles from './ScreenOverscanView.module.scss';

interface ScreenOverscanViewProps {
  screen: ScreenFragment;
  onSelect: (overscanEnabled: boolean) => void;
}

const ScreenOverscanView: React.FunctionComponent<ScreenOverscanViewProps> = ({ screen, onSelect }) => {
  const t = useTranslation();

  const [sendPusherMessageMutation] = useSendPusherMessageMutation({
    onError: mutationErrorHandler('msg_error_title_send_pusher_message'),
  });

  useEffect(() => {
    sendPusherMessageMutation({
      variables: {
        input: { screenId: screen.id, messageType: 'CHANGE_VIEW', payload: JSON.stringify({ view: 'OVERSCAN' }) },
      },
    });
  }, [screen.id, sendPusherMessageMutation]);

  const handleOptionClick = (overscanEnabled: boolean) => {
    sendPusherMessageMutation({
      variables: {
        input: { screenId: screen.id, messageType: 'CHANGE_VIEW', payload: JSON.stringify({ view: undefined }) },
      },
    });
    onSelect(overscanEnabled);
  };

  return (
    <div className={styles.container}>
      <Typography className={styles.title} styleType={TextType.MediumHeadline} WrapperElement="div">
        {t('msg_add_screen_modal_overscan_view_title')}
      </Typography>
      <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
        {t('msg_add_screen_modal_overscan_view_subtitle')}
      </Typography>
      <div
        className={classNames(styles.overscanViewOption, styles.overscanViewOptionWithBorder)}
        onClick={() => {
          handleOptionClick(false);
        }}
      >
        <Typography styleType={TextType.MobileLink} WrapperElement="div">
          {t('msg_add_screen_modal_overscan_view_disable_option')}
        </Typography>
      </div>
      <div
        className={styles.overscanViewOption}
        onClick={() => {
          handleOptionClick(true);
        }}
      >
        <Typography styleType={TextType.MobileLink} WrapperElement="div">
          {t('msg_add_screen_modal_overscan_view_enable_option')}
        </Typography>
      </div>
    </div>
  );
};

export default ScreenOverscanView;
