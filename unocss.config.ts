import presetWeapp from 'unocss-preset-weapp'
import presetIcons from '@unocss/preset-icons'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

export default {
  presets: [
    presetIcons(),
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
}
