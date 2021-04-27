module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-underscore-dangle': 'off',
        'linebreak-style': 'off',
      },
    },
  ],
};
