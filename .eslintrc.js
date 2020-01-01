module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [{
    files: ['**/*.tsx','**/*.ts'],
    rules: {
      "no-undef": 0,
      "no-unused-vars": 0
    },
  }],
  plugins: ['typescript', 'react'],

  rules: {
    semi: ['off'],
    'react/prop-types': ['warn'],
    'react/display-name': ['warn']
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
};
