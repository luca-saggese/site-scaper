import React from 'react';

import Button, { ButtonType } from '@Components/Button';
import { useTranslation } from '@Utils/i18n';

import styles from './CreateShowItem.module.scss';

export interface CreateShowItemProps {
  onClick: () => void;
}

const CreateShowItem: React.FunctionComponent<CreateShowItemProps> = ({ onClick }) => {
  const t = useTranslation();

  return (
    <div className={styles.container}>
      <Button buttonType={ButtonType.Button} onClick={onClick}>
        {t('msg_label_create_show')}
      </Button>
    </div>
  );
};

export default CreateShowItem;
