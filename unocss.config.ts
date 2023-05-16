import presetWeapp from 'unocss-preset-weapp'
import presetIcons from '@unocss/preset-icons'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default {
  presets: [
    presetIcons({
      collections: {
        custom: FileSystemIconLoader(
          './src/icons',
          // 将fill属性转换为currentColor
          svg => svg.replace(/fill="[^"]*"/g, 'fill="currentColor"'),
        ),
      },
    }),
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-left': 'flex justify-start items-center',
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
}
