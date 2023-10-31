const antfu = require('@antfu/eslint-config').default
const unocss = require('@unocss/eslint-plugin')

module.exports = antfu(
  {
    ignores: ['**/manifest.json', '**/pages.json'],
  },
  unocss.configs.flat,
)
