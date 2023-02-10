<script setup lang='ts'>
import arrowUrl from '@/static/icon/components/down-arrow.png'
const props = withDefaults(
  defineProps<{
    maxWidth?: string
    text?: string
    icon?: string
  }>(),
  {
    maxWidth: '220rpx',
    text: '暂无数据',
    icon: arrowUrl,
  },
)
</script>

<template>
  <view class="flex flex-row items-center space-between truncate bg-$guodu-seletor-bg-color text-24rpx px-20rpx py-14rpx rounded-30rpx relative color-$guodu-seletor-color" :style="{ 'max-width': `${props.maxWidth}` }">
    <span class="flex-1 truncate text">{{ props.text }}</span>
    <image v-if="icon" class="w-26rpx h26rpx ml-10rpx" :src="icon" />
  </view>
</template>

<style lang="scss" scoped>
</style>
