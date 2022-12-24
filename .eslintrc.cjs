/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  // eslint 全局变量声明
  globals: {
    QC: true,
  },
  // 配置eslint规则
  rules: {
    // vue组件必须用组合词: 关闭
    'vue/multi-word-component-names': 'off',
    // vue不允许解构赋值： 关闭
    'vue/no-setup-props-destructure': 'off',
    // 关闭定义了变量没使用规则
    '@typescript-eslint/no-unused-vars': 'off',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
