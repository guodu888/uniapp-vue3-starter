<h1 align="center">uniapp vue starter</h1>

## 🚀 Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/) - born with fastness

- 🍍 [Pinia](https://pinia.vuejs.org/) The intuitive store for Vue.js

- 📦 Components auto importing(use [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) & [easycom](https://zh.uniapp.dcloud.io/collocation/pages.html#easycom))

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

- 😃 Use icons from any icon sets in [Pure CSS](https://unocss.dev/presets/icons#icon-collection-customization)

- 🔥 Use the [new `<script setup>` style](https://github.com/vuejs/rfcs/pull/227)

- 🦾 [TypeScript](https://www.typescriptlang.org/), of course

- 💡 Git hooks(use [husky](https://github.com/typicode/husky))

## Try it now!

```bash
npx degit guodu888/uniapp-vue3-starter
cd uniapp-vue3-starter
pnpm install
```

> 推荐使用 [`antfu/ni`](https://github.com/antfu/ni).

## Directory Structure
```
.
├── index.html
├── lint-staged.config.js
├── mock - Mock
│   └── express.js
├── package.json
├── pnpm-lock.yaml
├── preset-rem-to-rpx.ts
├── src
│   ├── App.vue
│   ├── components - 业务组件目录
│   ├── composables - 组合式API目录
│   ├── config
│   ├── icons
│   ├── main.ts
│   ├── manifest.json - uniapp配置文件
│   ├── pages - 页面目录
│   ├── pages.json - uniapp配置文件
│   ├── static
│   ├── store - pinia store
│   ├── styles
│   ├── theme.json - 主题json配置文件
│   ├── types
│   ├── utils
│   └── widgets - 公共组件目录
├── tsconfig.json - TS configuration file
├── unocss.config.ts - unocss configuration file
├── LICENSE
├── README.md
├── auto-imports.d.ts
├── components.d.ts
└── vite.config.ts - Vite configuration file
```

##  License

[MIT](./LICENSE) License
