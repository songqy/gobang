module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['svelte3', '@typescript-eslint'],
  // ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error',  {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never',
    }],
    'indent': ['error', 2],
    'comma-spacing': 2, //强制在逗号周围使用空格
    'key-spacing': 2, // 在对象字面量的键和值之间使用一致的空格
    'keyword-spacing': 2, // 关键字周围空格的一致性
  },
};
