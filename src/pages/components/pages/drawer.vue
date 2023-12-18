<!--
 * @Author: shaohang-shy
 * @Date: 2023-05-05 14:30:17
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-05-05 14:30:17
 * @Description: drawer
-->
<script setup lang="ts">
const drawerVisible = ref(false)
const mode = ref<'bottom' | 'top' | 'left' | 'right'>('bottom')
const showRadius = ref(true)
const maskClick = ref(true)
function onDrawerClosed() {
  drawerVisible.value = false
  uni.showToast({
    title: '关闭',
    icon: 'none',
  })
}
</script>

<template>
  <div class="p-3">
    <GuoduDrawer
      :visible="drawerVisible"
      :mask-click="maskClick"
      :mode="mode"
      size="50%"
      :radius="showRadius"
      @close="onDrawerClosed"
    >
      <template #header>
        <GuoduDrawerHeader title="抽屉/弹窗" @close="drawerVisible = false" />
      </template>
      <button class="btn" @tap="drawerVisible = false">
        关闭弹窗
      </button>
    </GuoduDrawer>
    <button class="btn" @tap="drawerVisible = true">
      打开
    </button>
    <div class="mt-3 flex flex-col gap-3">
      <radio :checked="mode === 'top'" @tap="mode = 'top'">
        从上到下
      </radio>
      <radio :checked="mode === 'bottom'" @tap="mode = 'bottom'">
        从下到上
      </radio>
      <radio :checked="mode === 'left'" @tap="mode = 'left'">
        从左到右
      </radio>
      <radio :checked="mode === 'right'" @tap="mode = 'right'">
        从右到左
      </radio>
    </div>
    <div class="mt-3 flex gap-3 justify-start items-center">
      是否开启圆角 <switch :checked="showRadius" @change="(e: any) => showRadius = e.detail.value" />
    </div>
    <div class="mt-3 flex gap-3 justify-start items-center">
      点击阴影触发关闭 <switch :checked="maskClick" @change="(e: any) => maskClick = e.detail.value" />
    </div>
  </div>
</template>
