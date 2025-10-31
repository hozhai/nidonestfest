/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [
    // route-active toggles
    'text-highlight',
    'font-bold',
    // mobile drawer transitions
    'translate-x-0',
    '-translate-x-full',
    // hamburger animations (arbitrary values)
    'rotate-[-45deg]',
    'rotate-[45deg]',
    'translate-y-[6px]',
    '-translate-y-[6px]',
    'opacity-0'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002365',
        secondary: '#ffffff',
        accent: '#b61d2c',
        highlight: '#b61d2c',
        gold: '#ffd700',
        bgdark: '#0d1929'
      },
      fontFamily: {
        primary: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
      }
    }
  },
  plugins: []
};
