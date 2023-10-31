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
  <div class="p-15rpx sticky h-100rpx w-full top-0">
    <div class="pr-80rpx font-bold truncate flex-left h-full w-full">
      {{ title }}
    </div>
    <div v-if="props.showClose" class="i-carbon-close absolute h-50rpx w-50rpx right-25rpx top-25rpx" @tap="handleClose" />
  </div>
</template>
