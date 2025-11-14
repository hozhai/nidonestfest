import { computed, watch } from 'vue';
import { useState } from '#imports';
import en from '~/locales/en.json';
import es from '~/locales/es.json';

type TranslationSet = typeof en;
export type LanguageCode = 'en' | 'es';

type TranslationDictionary = Record<LanguageCode, TranslationSet>;

const TRANSLATIONS: TranslationDictionary = { en, es };
const LANGUAGES: LanguageCode[] = ['en', 'es'];

function detectInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem('preferredLanguage');
  if (stored && LANGUAGES.includes(stored as LanguageCode)) {
    return stored as LanguageCode;
  }

  const navigatorLang = window.navigator?.language ?? '';
  if (navigatorLang.toLowerCase().startsWith('es')) {
    return 'es';
  }

  return 'en';
}

function getByPath(dictionary: TranslationSet, path: string) {
  return path
    .split('.')
    .reduce((acc: any, part) => (acc != null ? acc[part] : undefined), dictionary);
}

function format(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => (key in vars ? String(vars[key]) : `{${key}}`));
}

export function useI18n() {
  const lang = useState<LanguageCode>('lang', () => detectInitialLanguage());

  if (typeof window !== 'undefined') {
    watch(
      lang,
      (value: LanguageCode) => {
        window.localStorage.setItem('preferredLanguage', value);
        document.documentElement.lang = value;
      },
      { immediate: true }
    );
  }

  const dictionary = computed(() => TRANSLATIONS[lang.value as LanguageCode] ?? TRANSLATIONS.en);

  function t(key: string, vars?: Record<string, string | number>) {
    const value = getByPath(dictionary.value, key);
    if (typeof value === 'string') {
      return format(value, vars);
    }
    return key;
  }

  return {
    lang,
    languages: LANGUAGES,
    t,
  };
}
