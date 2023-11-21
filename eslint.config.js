const antfu = require('@antfu/eslint-config').default
const unocss = require('@unocss/eslint-plugin')

module.exports = antfu(
  {
    ignores: ['**/manifest.json', '**/pages.json', 'src/widgets/guodu-echarts/guodu-echarts.vue'],
  },
  unocss.configs.flat,
)
