<!--
 * @Author: Arthur_Zhang
 * @Date: 2021-08-11 14:58:30
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-13 16:06:21
 * @Description: guodu-grid
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    list: unknown[] // 列表
    column?: number // grid 共几列 default:5
    imgKey?: string // icon在list中对应的key default:img
    titleKey?: string // title在list中对应的key default:title
  }>(),
  {
    column: 5,
    imgKey: 'img',
    titleKey: 'title',
  },
)
const emits = defineEmits<{
  (e: 'tapItem', item: unknown): void // 点击某一项回调
}>()
function handleClick(item: unknown) {
  emits('tapItem', item)
}
</script>

<template>
  <view class="w-full grid bg-$bg-color" :style="`grid-template-columns: repeat(${props.column}, minmax(0, 1fr));`">
    <view v-for="item, idx in props.list" :key="idx" class="flex-center flex-col h-150rpx active-bg-$bg-active-color" @tap="handleClick(item)">
      <image class="w-62rpx h-70rpx" :src="(item as any)[props.imgKey]" />
      <view class="text-24rpx color-$text-color-2 leading-46rpx">
        {{ (item as any)[props.titleKey] }}
      </view>
    </view>
  </view>
</template>

