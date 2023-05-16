import type { Preset } from '@unocss/core'

const remRE = /(-?[\.\d]+)rem/g
export default function remToRpxPreset(): Preset {
  return {
    name: '@unocss/preset-rem-to-rpx',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && remRE.test(value))
          i[1] = value.replace(remRE, (_, p1) => `${p1}rpx`)
      })
    },
  }
}
