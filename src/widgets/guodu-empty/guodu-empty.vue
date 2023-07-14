<!--
 * guodu-empty 空内容
 * @description 空内容
 * @property {string} url 图片地址
 * @property {string} message 提示内容
 * @property {string} width 宽度
-->
<script setup lang='ts'>
/**
 * guodu-empty 空内容
 * @description 空内容
 * @property {string} url 图片地址
 * @property {string} message 提示内容
 */
withDefaults(
  defineProps<{
    url?: string
    message?: string
  }>(),
  {
    url: 'https://yiguodu-habit.oss-cn-qingdao.aliyuncs.com/uni-app/default/empty-content.png',
    message: '这里空空的 什么都没有',
  },
)
</script>

<template>
  <view class="w-full flex-col flex-center my-50rpx w-full">
    <image class="w-1/2" mode="widthFix" :src="url" />
    <text v-if="message" class="mt-35rpx leading-24rpx color-$text-color-3 text-24rpx">
      {{ message }}
    </text>
  </view>
</template>
