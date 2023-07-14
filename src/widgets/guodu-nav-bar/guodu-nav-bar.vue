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
const menuInfo = uni.getMenuButtonBoundingClientRect()
const h = sysInfo?.statusBarHeight ?? 0
const navHeight = `${(menuInfo.top - h) * 2 + menuInfo.height}px`
function handleClickBack() {
  if (!props.canBack)
    return
  if (props.onBack())
    uni.navigateBack()
}
</script>

<template>
  <div class="nav-bar nav-height w-full flex justify-around items-center">
    <div class="w-250 h-full flex-left flex-left text-14px" @tap="handleClickBack">
      <div v-if="props.showBack" class="w-50 h-50 i-carbon-chevron-left" />
      <slot name="icon" />
    </div>
    <div class="flex-1 text-16px font-bold truncate text-center">
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
