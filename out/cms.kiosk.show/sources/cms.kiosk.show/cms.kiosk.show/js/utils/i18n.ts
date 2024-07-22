import i18n, { TOptions } from 'i18next';
import { useCallback } from 'react';
import { initReactI18next, useTranslation as use18nextTranslation } from 'react-i18next';

import { logError } from '@Utils/helpers';

import EnTranslations from './en.json';

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
    logError(`Missing translation key: ${key}`);
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export type MessageKey = keyof typeof EnTranslations;

export const useTranslation = () => {
  const { t } = use18nextTranslation();

  const translate = useCallback((key: MessageKey, options?: TOptions) => t(key, options) as string, [t]);

  return translate;
};

export default i18n;
