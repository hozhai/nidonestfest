import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**']
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parsers['vue-eslint-parser'],
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: { vue: pluginVue },
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  }
];
