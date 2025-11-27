import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-12-01',
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', extensions: ['vue'] }],
  modules: ['@nuxt/fonts', 'v-gsap-nuxt', '@nuxt/icon'],
  app: {
    head: {
      title: 'Nido Nest Fest',
      titleTemplate: '%s | Nido Nest Fest',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      htmlAttrs: { lang: 'en' }
    }
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    payments: {
      allowTestMode: process.env.PAYMENTS_ALLOW_TEST_MODE === 'true'
    },
    public: {
      enablePaymentTestMode: process.env.NUXT_PUBLIC_PAYMENT_TEST_MODE === 'true'
    }
  }
});