import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['src/**/*.json'],
  unocss: true,
  vue: true,
  rules: {
    'regexp/no-misleading-capturing-group': 'off',
  },
})
