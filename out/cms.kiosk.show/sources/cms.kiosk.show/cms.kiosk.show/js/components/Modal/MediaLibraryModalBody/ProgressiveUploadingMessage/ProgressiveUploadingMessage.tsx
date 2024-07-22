import React, { useEffect, useState } from 'react';

import { Tab } from '@Components/Modal/MediaLibraryModalBody';
import { useTranslation } from '@Utils/i18n';

interface ProgressiveUploadingMessageProps {
  activeTab: Tab;
}

const ProgressiveUploadingMessage: React.FunctionComponent<ProgressiveUploadingMessageProps> = ({ activeTab }) => {
  const t = useTranslation();
  const messages = [
    t('msg_label_uploading_message1', { system: activeTab }),
    t('msg_label_uploading_message2'),
    t('msg_label_uploading_message3'),
  ];
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setActiveMessageIndex((prev) => {
        return messages.length - 1 !== prev ? prev + 1 : 0;
      });
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, [messages.length]);

  return <span>{messages[activeMessageIndex]}</span>;
};

export default ProgressiveUploadingMessage;
