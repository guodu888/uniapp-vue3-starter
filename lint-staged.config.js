module.exports = {
  '*.{ts,js,vue}': [
    'eslint --fix',
    () => 'vue-tsc --noEmit -p tsconfig.json',
  ],
}
