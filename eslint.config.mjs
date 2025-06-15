import { defineConfig } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';

export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['dist', 'node_modules'],
    rules: {
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-tabindex': 'off',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/no-redundant-roles': 'off',
    },
  },
]);
