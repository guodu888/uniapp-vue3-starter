<!--
 * @Author: shaohang-shy
 * @Date: 2023-05-05 14:46:11
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-05-05 14:46:11
 * @Description: nav-bar
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  splitLine?: boolean
  scrollTop?: number
  showBack?: boolean
  canBack?: boolean
  onBack?: () => boolean
}>(), {
  title: '',
  splitLine: false,
  scrollTop: 0,
  showBack: true,
  canBack: true,
  onBack: () => true,
})

const sysInfo = uni.getSystemInfoSync()
let menuInfo = {
  top: 0,
  height: 44,
}
// #ifndef H5||APP-PLUS
menuInfo = uni.getMenuButtonBoundingClientRect()
// #endif

const h = sysInfo?.statusBarHeight ?? 0
const navHeight = ref(`${(menuInfo.top - h) * 2 + menuInfo.height}px`)
function handleClickBack() {
  if (!props.canBack)
    return
  if (props.onBack())
    uni.navigateBack()
}
</script>

<template>
  <div class="nav-bar nav-height flex w-full justify-around items-center">
    <div class="text-14px flex-left flex-left h-full w-250" @tap="handleClickBack">
      <div v-if="props.showBack" class="i-carbon-chevron-left h-50 w-50" />
      <slot name="icon" />
    </div>
    <div class="text-16px font-bold truncate text-center flex-1">
      {{ title }}
    </div>
    <div class="w-250" />
  </div>
</template>

<style lang="scss" scoped>
$nav-height: v-bind(navHeight);
.nav-height {
  box-sizing: border-box;
  height: calc($nav-height + var(--status-bar-height));
  line-height: $nav-height;
  padding-top: var(--status-bar-height);
}
.nav-bar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998;
  background: var(--bg-color);
  box-sizing: border-box;
}
</style>
