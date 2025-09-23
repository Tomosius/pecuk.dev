/* eslint-env node */
module.exports = {
  root: true,
  parser: 'svelte-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser', extraFileExtensions: ['.svelte'] },
  extends: [
    'eslint:recommended',
    'plugin:svelte/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  plugins: ['svelte', 'jsx-a11y'],
  overrides: [
    { files: ['*.svelte'], rules: {} }
  ],
  ignorePatterns: ['build', '.svelte-kit', 'node_modules']
};
