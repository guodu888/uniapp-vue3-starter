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

function handleClickBack() {
  if (!props.canBack)
    return
  if (props.onBack())
    uni.navigateBack()
}
</script>

<template>
  <div class="nav-bar nav-height w-full  flex justify-around items-center">
    <div class="w-120 h-44px flex-left flex-left text-14px" @tap="handleClickBack">
      <div v-if="props.showBack" class="w-50 h-50 i-carbon-chevron-left" />
      <slot name="icon" />
    </div>
    <div class="flex-1 text-16px font-bold truncate text-center">
      {{ title }}
    </div>
    <div class="w-120" />
  </div>
  <!-- 放一个同样高度的div用来填充 -->
  <div class="nav-height" />
</template>

<style lang="scss" scoped>
.nav-height {
  height: calc(44px + env(safe-area-inset-top) + var(--status-bar-height));
  padding: 7px 3px;
  padding-top: calc(7px + env(safe-area-inset-top) + var(--status-bar-height));
}
.nav-bar {
  position: fixed;
  top: 0;
  left: var(--window-left);
  right: var(--window-right);

  z-index: 998;
  background: var(--bg-color);
  box-sizing: border-box;
}
</style>
