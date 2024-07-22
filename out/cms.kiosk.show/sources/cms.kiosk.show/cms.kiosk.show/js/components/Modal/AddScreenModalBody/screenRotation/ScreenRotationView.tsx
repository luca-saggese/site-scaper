import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import Badge, { BadgeColor } from '@Components/Badge';
import Button from '@Components/Button';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { ScreenFragment, ScreenRotation, useSendPusherMessageMutation } from '@Graphql/graphqlTypes.generated';
import { mutationErrorHandler } from '@Utils/graphql';
import { useTranslation } from '@Utils/i18n';

import styles from './ScreenRotationView.module.scss';
import { ReactComponent as TvImageRotation0 } from './TvImageRotation0.svg';
import { ReactComponent as TvImageRotation180 } from './TvImageRotation180.svg';
import { ReactComponent as TvImageRotation270 } from './TvImageRotation270.svg';
import { ReactComponent as TvImageRotation90 } from './TvImageRotation90.svg';

interface ScreenRotationViewProps {
  screen: ScreenFragment;
  onNext: (rotation: ScreenRotation) => void;
}

const ScreenRotationView: React.FunctionComponent<ScreenRotationViewProps> = ({ screen, onNext }) => {
  const t = useTranslation();
  const [rotation, setRotation] = useState(ScreenRotation.Rotation_0);

  const [sendPusherMessageMutation] = useSendPusherMessageMutation({
    onError: mutationErrorHandler('msg_error_title_send_pusher_message'),
  });

  useEffect(() => {
    sendPusherMessageMutation({
      variables: {
        input: { screenId: screen.id, messageType: 'CHANGE_ROTATION', payload: JSON.stringify({ rotation }) },
      },
    });
  }, [rotation, screen.id, sendPusherMessageMutation]);

  return (
    <div className={styles.container}>
      <Typography className={styles.title} styleType={TextType.MediumHeadline} WrapperElement="div">
        {t('msg_add_screen_modal_rotation_view_title')}
      </Typography>
      <Typography styleType={TextType.MobileBody} color={TextColor.DarkGrey} WrapperElement="div">
        {t('msg_add_screen_modal_rotation_view_subtitle')}
      </Typography>

      <div
        className={classNames(styles.tvImage, { [styles.selected]: rotation === ScreenRotation.Rotation_0 })}
        onClick={() => setRotation(ScreenRotation.Rotation_0)}
      >
        <TvImageRotation0 />
        <div className={styles.tvImageTextContent}>
          <Badge color={BadgeColor.Blue}>
            <Typography styleType={TextType.TinyLink}>
              {t('msg_add_screen_modal_rotation_view_most_likely_badge')}
            </Typography>
          </Badge>
          <Typography styleType={TextType.LowerCaseLink} WrapperElement="div">
            {t('msg_add_screen_modal_rotation_view_rotation_0_title')}
          </Typography>
          <Typography color={TextColor.DarkGrey} styleType={TextType.SmallBody} WrapperElement="div">
            {t('msg_add_screen_modal_rotation_view_rotation_0_subtitle')}
          </Typography>
        </div>
      </div>
      <div
        className={classNames(styles.tvImage, { [styles.selected]: rotation === ScreenRotation.Rotation_180 })}
        onClick={() => setRotation(ScreenRotation.Rotation_180)}
      >
        <TvImageRotation180 />
        <div className={styles.tvImageTextContent}>
          <Typography styleType={TextType.LowerCaseLink} WrapperElement="div">
            {t('msg_add_screen_modal_rotation_view_rotation_180_title')}
          </Typography>
          <Typography color={TextColor.DarkGrey} styleType={TextType.SmallBody} WrapperElement="div">
            {t('msg_add_screen_modal_rotation_view_rotation_180_subtitle')}
          </Typography>
        </div>
      </div>
      <div
        className={classNames(styles.tvImage, { [styles.selected]: rotation === ScreenRotation.Rotation_90 })}
        onClick={() => setRotation(ScreenRotation.Rotation_90)}
      >
        <TvImageRotation90 />
        <div className={styles.tvImageTextContent}>
          <Typography styleType={TextType.LowerCaseLink} WrapperElement="div">
            {t('msg_add_screen_modal_rotation_view_rotation_90_title')}
          </Typography>
          <Typography color={TextColor.DarkGrey} styleType={TextType.SmallBody} WrapperElement="div">
            {t('msg_add_screen_modal_rotation_view_rotation_90_subtitle')}
          </Typography>
        </div>
      </div>
      <div
        className={classNames(styles.tvImage, { [styles.selected]: rotation === ScreenRotation.Rotation_270 })}
        onClick={() => setRotation(ScreenRotation.Rotation_270)}
      >
        <TvImageRotation270 />
        <div className={styles.tvImageTextContent}>
          <Typography styleType={TextType.LowerCaseLink} WrapperElement="div">
            {t('msg_add_screen_modal_rotation_view_rotation_270_title')}
          </Typography>
          <Typography color={TextColor.DarkGrey} styleType={TextType.SmallBody} WrapperElement="div">
            {t('msg_add_screen_modal_rotation_view_rotation_270_subtitle')}
          </Typography>
        </div>
      </div>

      <Button
        className={styles.nextAction}
        onClick={() => {
          onNext(rotation);
        }}
      >
        {t('msg_common_next')}
      </Button>
    </div>
  );
};

export default ScreenRotationView;
