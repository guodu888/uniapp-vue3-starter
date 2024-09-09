<!--
 * @Author: shaohang-shy
 * @Date: 2023-05-05 15:34:02
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-05-05 15:34:02
 * @Description: drawer header
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  showClose?: boolean
}>(), {
  title: '',
  showClose: true,
})

const emits = defineEmits(['close'])

function handleClose() {
  emits('close')
}
</script>

<template>
  <div class="sticky top-0 h-100rpx w-full p-15rpx">
    <div class="h-full w-full flex-left truncate pr-80rpx font-bold">
      {{ title }}
    </div>
    <div v-if="props.showClose" class="i-carbon-close absolute right-25rpx top-25rpx h-50rpx w-50rpx" @tap="handleClose" />
  </div>
</template>
