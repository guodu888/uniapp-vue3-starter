<!--
 * @Author: shaohang-shy
 * @Date: 2023-12-18 17:41:02
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-12-18 17:41:02
 * @Description: load more
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  isLoadAll?: boolean
  isLoading?: boolean
}>(), {
  isLoadAll: false,
  isLoading: false,
})
const emits = defineEmits(['more'])
</script>

<template>
  <div class="p-3 text-26rpx text-$text-color-3 flex-center w-full">
    <guodu-loading v-if="props.isLoading" type="dot-line" />
    <div v-else-if="props.isLoadAll">
      加载完毕
    </div>
    <div v-else @tap="emits('more')">
      加载更多
    </div>
  </div>
</template>
