/// <reference types="@dcloudio/types" />
/// <reference types="vite/client" />

import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),
    uni(),
    Unocss(),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        'pinia',
      ],
      dts: true,
      dirs: [
        './src/composables',
        './src/store',
      ],
      vueTemplate: true,
    }),
  ],
})
