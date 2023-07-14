<script setup lang='ts'>
const props = withDefaults(
  defineProps<{
    text?: string
    icon?: string
  }>(),
  {
    text: '暂无数据',
    icon: '/static/icon/components/down-arrow.png',
  },
)
</script>

<template>
  <view class="flex-center justify-between truncate bg-$guodu-seletor-bg-color text-24rpx px-20rpx py-14rpx rounded-30rpx color-$guodu-seletor-color">
    <span class="flex-1 truncate">{{ props.text }}</span>
    <image v-if="props.icon" class="w-26rpx h26rpx ml-10rpx" :src="props.icon" />
  </view>
</template>
