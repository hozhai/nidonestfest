import { writable } from 'svelte/store';

const defaultLang = typeof window !== 'undefined'
  ? localStorage.getItem('preferredLanguage') || 'en'
  : 'en';

export const lang = writable(defaultLang);

// Persist to localStorage on changes (browser only)
if (typeof window !== 'undefined') {
  lang.subscribe((value) => {
    try {
      localStorage.setItem('preferredLanguage', value);
    } catch {}
  });
}
