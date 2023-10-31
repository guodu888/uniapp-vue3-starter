/// <reference types="@dcloudio/types" />
/// <reference types="vite/client" />

import path from 'node:path'
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
      dirs: ['src/components', 'src/widgets'],
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
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
