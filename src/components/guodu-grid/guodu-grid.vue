<!--
 * @Author: Arthur_Zhang
 * @Date: 2021-08-11 14:58:30
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-13 16:06:21
 * @Description:
-->
<script setup lang="ts">
interface GridItem {
  title: string
  img: string
  src?: string
  id?: number
}
const props = withDefaults(
  defineProps<{
    list?: GridItem[]
    column?: number
  }>(),
  {
    list: () => [],
    column: 5,
  },
)
const formatList = computed(() => {
  let index = 0
  const newArray = []
  while (index < props.list.length)
    newArray.push(props.list.slice(index, index += props.column))

  return newArray
})
const itemWidth = computed(() => {
  const { windowWidth } = uni.getWindowInfo()
  return windowWidth / props.column
})
</script>

<template>
  <view v-for="(item, i) in formatList" :key="i" class="flex flex-row jusity-start grid-btn w-full bg-$bg-color h-150rpx">
    <view v-for="(subitem, j) in item" :key="j" class="flex flex-col items-center jusity-center h-150rpx justify-center bg-$bg-color item" :style="`width:${itemWidth}px !important;`">
      <image class="w-62rpx h-70rpx" :src="subitem.img" />
      <view class="text-24rpx color-$text-color-2 leading-46rpx">
        {{ subitem.title }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.item {
    &:active {
      background-color: var(--bg-active-color);
    }
  }
</style>
