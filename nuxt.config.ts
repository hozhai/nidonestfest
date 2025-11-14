import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-12-01',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Nido Nest Fest',
      titleTemplate: '%s | Nido Nest Fest',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      htmlAttrs: { lang: 'en' },
    },
  },
  tailwindcss: {
    viewer: false,
  },
});
