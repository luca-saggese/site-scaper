import React, { useEffect, useState } from 'react';

import Badge, { BadgeColor } from '@Components/Badge';
import Typography, { TextColor, TextType } from '@Components/Typography';
import usePrevious from '@Hooks/usePrevious';
import { noop } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

enum AutosaveStatus {
  Init = 'INIT',
  Saving = 'SAVING',
  Saved = 'SAVED',
}

interface AutosaveBadgeProps {
  isSaving: boolean;
}

const AutosaveBadge: React.FunctionComponent<AutosaveBadgeProps> = ({ isSaving }) => {
  const t = useTranslation();
  const previousIsSaving = usePrevious(isSaving);

  const [status, setStatus] = useState(AutosaveStatus.Init);

  useEffect(() => {
    if (isSaving && !previousIsSaving) {
      setStatus(AutosaveStatus.Saving);
    }

    if (!isSaving && previousIsSaving) {
      setStatus(AutosaveStatus.Saved);
    }
  }, [isSaving, previousIsSaving]);

  useEffect(() => {
    if (status === AutosaveStatus.Saved) {
      const timerId = setTimeout(() => {
        setStatus(AutosaveStatus.Init);
      }, 5000);

      return () => {
        clearTimeout(timerId);
      };
    }

    return noop;
  }, [status]);

  if (status === AutosaveStatus.Saved) {
    return (
      <Badge color={BadgeColor.Blue}>
        <Typography styleType={TextType.TinyLink}>{t('msg_autosave_saved_message')}</Typography>
      </Badge>
    );
  }

  return <Typography color={TextColor.LightFadedBlue}>{t('msg_autosave_init_message')}</Typography>;
};

export default AutosaveBadge;
