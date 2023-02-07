import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    viteMockServe({
      ignore: /^\_/,
      mockPath: 'mock',
      localEnabled: true,
      prodEnabled: false,
      injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `,
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
