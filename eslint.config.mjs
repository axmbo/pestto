import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    // Arquivos do browser (extensão Chrome)
    files: ['content.js', 'converter.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        BUILD_INFO: 'readonly',
        markdownToWhatsApp: 'readonly',
      },
    },
  },
  {
    // Scripts Node.js
    files: ['sync-version.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // Testes (Vitest = ESM + Node + globals do Vitest)
    files: ['**/*.test.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        globalThis: 'readonly',
      },
    },
  },
  // Desliga regras que conflitam com Prettier
  eslintConfigPrettier,
  {
    // Ignora arquivos gerados e dependências
    ignores: ['node_modules/', 'version.js'],
  },
];
