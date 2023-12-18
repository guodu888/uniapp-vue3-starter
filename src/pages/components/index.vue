<!--
 * @Author: shaohang-shy
 * @Date: 2023-05-05 13:59:10
 * @LastEditors: shy1118
 * @LastEditTime: 2023-11-23 15:50:45
 * @Description: components
-->
<script setup lang="ts">
function handleTo(name: string) {
  uni.navigateTo({
    url: `/pages/components/pages/${name}`,
  })
}
</script>

<template>
  <div class="top-bg p-3">
    <div class="mt-60rpx text-xl font-bold">
      组件
    </div>
    <button class="btn btn-primary mt-3" @tap="handleTo('drawer')">
      弹窗/抽屉
    </button>
    <button class="btn mt-3" @tap="handleTo('modal')">
      弹窗/Modal
    </button>
    <button class="btn mt-3" @tap="handleTo('nav-bar')">
      Nav Bar
    </button>
    <button class="btn mt-3" @tap="handleTo('echarts')">
      Echarts
    </button>
    <button class="btn mt-3" @tap="handleTo('loading')">
      Loading
    </button>
    <button class="btn mt-3" @tap="handleTo('empty')">
      Empty
    </button>
    <button class="btn mt-3" @tap="handleTo('calendar')">
      日历
    </button>
    <button class="btn mt-3" @tap="handleTo('color-picker')">
      Color Picker
    </button>
  </div>
</template>
