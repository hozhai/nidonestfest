import type { Config } from 'tailwindcss';

export default {
  content: {
    files: [
      './app.vue',
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.{vue,js,ts}',
      './pages/**/*.{vue,js,ts}',
      './composables/**/*.{js,ts}'
    ]
  }
} satisfies Config;
