import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-12-01',
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', extensions: ['vue'] }],
  modules: ['@nuxt/fonts', 'v-gsap-nuxt', '@nuxt/icon', '@sidebase/nuxt-auth'],
  app: {
    head: {
      title: 'Nido Nest Fest',
      titleTemplate: '%s | Nido Nest Fest',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      htmlAttrs: { lang: 'en' }
    }
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'google',
      addDefaultCallbackUrl: true,
      provider: "authjs",
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
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
    // These variables are available only on the server
    auth: {
      // This is automatically read by nuxt-auth
      secret: process.env.AUTH_SECRET 
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    // This is optional, but recommended for production
    public: {
    }
  }
});