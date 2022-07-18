module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    quotes: ['error', 'single'],
    'arrow-parens': 0,
    'no-loop-func': 2,
    'space-before-function-paren': ['error', 'never'],
    indent: ['error', 2, { SwitchCase: 1 }]
  }
}
