// ESLint flat config for Svelte + JS
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { ignores: ['.svelte-kit/**', 'build/**', 'node_modules/**', 'legacy/**'] },
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte', '**/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        navigator: 'readonly'
      }
    },
    rules: {
      // allow empty catch blocks for safe storage access
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  }
];
