<!--
 * @Author: Arthur_Zhang
 * @Date: 2023-02-13 11:30:03
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-13 14:05:48
 * @Description:
-->
<script setup lang='ts'>
withDefaults(
  defineProps<{
    url?: string
    message?: string
    width?: string
  }>(),
  {
    url: 'https://yiguodu-habit.oss-cn-qingdao.aliyuncs.com/uni-app/default/empty-content.png',
    message: '这里空空的 什么都没有',
    width: '100%',
  },
)
</script>

<template>
  <view class="w-full flex flex-col items-center justify-center pb-50rpx my-50rpx" :style="{ width }">
    <image class="block w-344rpx h-244rpx" mode="aspectFit" :src="url" />
    <text class="mt-35rpx h-24rpx color-$--text-color-3 line-24rpx text 24rpx">
      {{ message }}
    </text>
  </view>
</template>
