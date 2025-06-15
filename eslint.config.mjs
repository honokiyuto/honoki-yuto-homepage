import { defineConfig } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import oxlint from 'eslint-plugin-oxlint';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  ...oxlint.configs['flat/recommended'],
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
