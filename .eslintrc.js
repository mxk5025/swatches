module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'no-new': 'off',
    'no-unused-vars': 'off',
    'spaced-comment': 'off',
    'react/prop-types': 0,
    'object-curly-newline': ['error', { multiline: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
