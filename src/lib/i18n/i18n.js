import { writable, derived } from 'svelte/store';
import en from './en.json';
import es from './es.json';

export const languages = ['en', 'es'];

const TRANSLATIONS = { en, es };

const initial = typeof window !== 'undefined'
  ? localStorage.getItem('preferredLanguage') || navigator?.language?.startsWith('es') ? 'es' : 'en'
  : 'en';

export const lang = writable(initial);

if (typeof window !== 'undefined') {
  lang.subscribe((value) => {
    try {
      localStorage.setItem('preferredLanguage', value);
      document.documentElement.lang = value;
    } catch {}
  });
}

export const dictionary = derived(lang, ($lang) => TRANSLATIONS[$lang] || TRANSLATIONS.en);

function getByPath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), obj);
}

function format(template, vars) {
  if (!template || !vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
}

// Reactive translator: components can use `$t('key.path')`
export const t = derived(dictionary, ($dict) => (key, vars) => {
  const value = getByPath($dict, key);
  if (typeof value === 'string') return format(value, vars);
  return key; // fallback to key
});
