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
  <div class="p-15rpx sticky top-0 w-full h-100rpx">
    <div class="pr-80rpx w-full h-full flex-left truncate font-bold">
      {{ title }}
    </div>
    <div v-if="props.showClose" class="absolute top-25rpx right-25rpx w-50rpx h-50rpx i-carbon-close" @tap="handleClose" />
  </div>
</template>
