module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
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
    'eol-last': 0,
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'no-shadow': [0],
    'no-multi-assign': [0],
    'import/extensions': [0],
    'max-len': [
      'error',
      {
        code: 145,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
