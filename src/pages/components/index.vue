<!--
 * @Author: shaohang-shy
 * @Date: 2023-05-05 13:59:10
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-05-05 13:59:10
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
  <div class="p-3 top-bg">
    <div class="mt-60rpx text-xl font-bold">
      组件
    </div>
    <button class="btn mt-3" @tap="handleTo('drawer')">
      弹窗/抽屉
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
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
    <button class="btn mt-3">
      按钮
    </button>
  </div>
</template>
