import React from 'react';
import ReactDocumentTitle from 'react-document-title';

import { MessageKey, useTranslation } from '@Utils/i18n';

export interface DocumentTitleProps {
  title: MessageKey;
  children: any;
}

const DocumentTitle: React.FunctionComponent<DocumentTitleProps> = ({ children, title }) => {
  React.useEffect(() => window.scrollTo(0, 0), []);
  const t = useTranslation();

  return <ReactDocumentTitle title={t(title)}>{children}</ReactDocumentTitle>;
};

export default DocumentTitle;
