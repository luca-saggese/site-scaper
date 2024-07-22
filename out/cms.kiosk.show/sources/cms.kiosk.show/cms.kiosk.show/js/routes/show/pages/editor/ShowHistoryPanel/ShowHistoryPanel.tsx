import * as DateFns from 'date-fns';
import React from 'react';

import Avatar from '@Components/Avatar';
import Placeholder, { PlaceholderType } from '@Components/Placeholder';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { useShowHistoryQuery } from '@Graphql/graphqlTypes.generated';
import { isDefined, times } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ShowHistoryPanel.module.scss';

interface ShowHistoryPanelProps {
  id: string;
}

const ShowHistoryPanel = ({ id }: ShowHistoryPanelProps) => {
  const t = useTranslation();
  const { data } = useShowHistoryQuery({ variables: { id }, fetchPolicy: 'network-only' });

  if (!data) {
    return (
      <>
        {times(3).map((key) => (
          <div key={key} className={styles.item}>
            <Placeholder type={PlaceholderType.Circle} className={styles.avatarPlaceholder} />
            <Placeholder className={styles.infoPlaceholder} />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {data.showHistory?.filter(isDefined).map((historyItem) => (
        <div key={historyItem.updatedAt || historyItem.createdAt} className={styles.item}>
          <Avatar avatar={historyItem.updatedBy?.avatar || historyItem.createdBy?.avatar} />
          <div>
            <Typography styleType={TextType.SmallBody} WrapperElement="div">
              {historyItem.updatedBy
                ? t('msg_common_edited_by', { name: historyItem.updatedBy?.name })
                : t('msg_common_created_by', { name: historyItem.createdBy?.name })}
            </Typography>
            <Typography styleType={TextType.SmallBody} color={TextColor.LightFadedBlue} WrapperElement="div">
              {DateFns.format(DateFns.parseISO(historyItem.updatedAt || historyItem.createdAt), 'HH:mm do MMMM')}
            </Typography>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowHistoryPanel;
