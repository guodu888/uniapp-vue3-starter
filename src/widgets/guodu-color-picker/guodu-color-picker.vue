<!--
 * @Author: shaohang-shy
 * @Date: 2023-12-14 13:46:10
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-12-14 13:46:10
 * @Description: color picker
-->
<script setup lang="ts">
const props = defineProps<{
  color: string // 有几种形式的颜色 #FFF #0084FF #0084FF66 rgba(0, 132, 255, 0.4) rgb(0, 132, 255)
}>()
const instance = getCurrentInstance()
const alphaRect = { x: 0, w: 0 }
const hueRect = { x: 0, w: 0 }
const colorRect = { x: 0, y: 0, w: 0, h: 0 }
onMounted(() => {
  uni.createSelectorQuery().in(instance).select('.alpha-box').boundingClientRect((data: any) => {
    alphaRect.x = data.left
    alphaRect.w = data.width
  }).exec()
  uni.createSelectorQuery().in(instance).select('.hue-box').boundingClientRect((data: any) => {
    hueRect.x = data.left
    hueRect.w = data.width
  }).exec()
  uni.createSelectorQuery().in(instance).select('.color-box').boundingClientRect((data: any) => {
    colorRect.x = data.left
    colorRect.y = data.top
    colorRect.w = data.width
    colorRect.h = data.height
  }).exec()
})

interface Color {
  r: number
  g: number
  b: number
  a: number
}
// 将颜色转为rgba对象
function mormalizeColor(color: string): Color {
  let r = 0
  let g = 0
  let b = 0
  let a = 1
  // 检查是否为十六进制颜色
  let match = color.match(/^#([a-fA-F0-9]{3,4})$|^#([a-fA-F0-9]{6})([a-fA-F0-9]{2})?$/)
  if (match) {
    if (match[1]) { // 短格式
      r = Number.parseInt(match[1].charAt(0) + match[1].charAt(0), 16)
      g = Number.parseInt(match[1].charAt(1) + match[1].charAt(1), 16)
      b = Number.parseInt(match[1].charAt(2) + match[1].charAt(2), 16)
      if (match[1].length === 4)
        a = Number.parseInt(match[1].charAt(3) + match[1].charAt(3), 16) / 255
    }
    else if (match[2]) { // 长格式
      r = Number.parseInt(match[2].substr(0, 2), 16)
      g = Number.parseInt(match[2].substr(2, 2), 16)
      b = Number.parseInt(match[2].substr(4, 2), 16)
      if (match[3])
        a = Number.parseInt(match[3], 16) / 255
    }
  }
  else {
    // 检查是否为rgb或rgba颜色
    match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
    if (match) {
      r = Number.parseInt(match[1])
      g = Number.parseInt(match[2])
      b = Number.parseInt(match[3])
      if (match[4])
        a = Number.parseFloat(match[4])
    }
  }

  return { r, g, b, a }
}

const normalColor = mormalizeColor(props.color)

function hsvToRgb(h: number, s: number, v: number) {
  let r = 0
  let g = 0
  let b = 0
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0: {
      r = v
      g = t
      b = p
      break
    }
    case 1: {
      r = q
      g = v
      b = p
      break
    }
    case 2: {
      r = p
      g = v
      b = t
      break
    }
    case 3: {
      r = p
      g = q
      b = v
      break
    }
    case 4: {
      r = t
      g = p
      b = v
      break
    }
    case 5: {
      r = v
      g = p
      b = q
      break
    }
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

function rgbToHsv(r: number, g: number, b: number) {
  r = r / 255
  g = g / 255
  b = b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const v = max
  let h = 0
  const s = max ? (max - min) / max : 0
  if (max === min)
    h = 0

  else if (max === r && g >= b)
    h = 60 * ((g - b) / (max - min))

  else if (max === r && g < b)
    h = 60 * ((g - b) / (max - min)) + 360

  else if (max === g)
    h = 60 * ((b - r) / (max - min)) + 120

  else if (max === b)
    h = 60 * ((r - g) / (max - min)) + 240

  return {
    h,
    s,
    v,
  }
}

const hsv = ref({ ...rgbToHsv(normalColor.r, normalColor.g, normalColor.b), a: normalColor.a })

const computedColor = computed(() => {
  const { r, g, b } = hsvToRgb(hsv.value.h / 360, hsv.value.s, hsv.value.v)
  return { r, g, b, a: hsv.value.a }
})
const alphaSliderBackground = computed(() => {
  return `linear-gradient(to right, rgba(${computedColor.value.r}, ${computedColor.value.g}, ${computedColor.value.b}, 0), rgba(${computedColor.value.r}, ${computedColor.value.g}, ${computedColor.value.b}, 1))`
})

const hueBoxBackgroundColor = computed(() => {
  return `linear-gradient(to right, white, hsl(${hsv.value.h}, 100%, 50%))`
})

function handleAlphaTouchMove(e: TouchEvent) {
  const x = e.touches[0].clientX
  if (x < alphaRect.x)
    hsv.value.a = 0
  else if (x > alphaRect.x + alphaRect.w)
    hsv.value.a = 1
  else
    hsv.value.a = (x - alphaRect.x) / alphaRect.w
}

function handleHueTouchMove(e: TouchEvent) {
  const x = e.touches[0].clientX
  if (x < hueRect.x)
    hsv.value.h = 0
  else if (x > hueRect.x + hueRect.w)
    hsv.value.h = 360
  else
    hsv.value.h = (x - hueRect.x) / hueRect.w * 360
}

function handleTouchMove(e: TouchEvent) {
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  if (x < colorRect.x)
    hsv.value.s = 0
  else if (x > colorRect.x + colorRect.w)
    hsv.value.s = 1
  else
    hsv.value.s = (x - colorRect.x) / colorRect.w

  if (y < colorRect.y)
    hsv.value.v = 1
  else if (y > colorRect.y + colorRect.h)
    hsv.value.v = 0
  else
    hsv.value.v = 1 - (y - colorRect.y) / colorRect.h
}
</script>

<template>
  <div class="p-3 flex-center flex-col gap-3 w-full">
    <!-- 预览及透明度 -->
    <div class="flex-center gap-3 w-full">
      <div class="alpha-background-image pt-20% relative w-20%">
        <div class="absolute h-full w-full bottom-0 left-0 right-0 top-0" :style="{ background: `rgba(${computedColor.r}, ${computedColor.g}, ${computedColor.b}, ${computedColor.a})` }" />
      </div>
      <div
        class="alpha-background-image alpha-box flex-1 relative h-50rpx" @touchmove="handleAlphaTouchMove"
      >
        <div class="h-full w-full" :style="{ background: alphaSliderBackground }" />
        <!-- 显示在哪里 -->
        <div class="bg-white b b-1 b-block b-solid absolute h-full w-10px select-none top-0 translate-x--5px" :style="{ left: `${computedColor.a * 100}%` }" />
      </div>
    </div>
    <!-- 选择色相 -->
    <div
      class="color-picker-hsl hue-box relative h-50rpx w-full" @touchmove="handleHueTouchMove"
    >
      <!-- 显示在哪里 -->
      <div class="bg-white b b-1 b-block b-solid absolute h-full w-10px select-none top-0 translate-x--5px" :style="{ left: `${hsv.h / 360 * 100}%` }" />
    </div>
    <!-- 选择色相对应的颜色 -->
    <div
      class="color-box pt-100% relative w-full" :style="{ background: hueBoxBackgroundColor }" @touchmove="handleTouchMove"
    >
      <div class="color-overlay absolute h-full w-full left-0 top-0" />
      <!-- 显示在哪里 -->
      <div class="bg-white b b-1 b-block rounded-full b-solid absolute h-10px w-10px select-none left-0 top-0 translate-x--5px translate-y--5px" :style="{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }" />
    </div>
  </div>
</template>

<style>
.color-picker-hsl {
  background: linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%));
}

.color-overlay {
  background: linear-gradient(to top, black, transparent);
}
.alpha-background-image {
    background-size: 25px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==");
}
</style>
