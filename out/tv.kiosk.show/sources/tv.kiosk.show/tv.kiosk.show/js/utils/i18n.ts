import i18n, { TOptions } from 'i18next';
import { initReactI18next, useTranslation as use18nextTranslation } from 'react-i18next';

import logger from './logger';

import EnTranslations from './en.json';
import { useCallback } from 'react';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: EnTranslations,
    },
  },
  saveMissing: true,
  missingKeyHandler: (_lngs, _ns, key) => {
    logger.error(`Missing translation key: ${key}`);
  },
  interpolation: {
    escapeValue: false, // no needed for react as it escapes by default
  },
});

export type MessageKey = keyof typeof EnTranslations;

export const useTranslation = () => {
  const { t } = use18nextTranslation();

  const translate = useCallback((key: MessageKey, options?: TOptions): string => t(key, options), [t]);

  return translate;
};

export default i18n;
