<!--
 * @Author: shaohang-shy
 * @Date: 2023-08-24 17:02:06
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-08-24 17:14:36
 * @Description: modal
-->
<script setup lang="ts">
const visible = ref(false)
const showRadius = ref(true)
const maskClick = ref(true)
function onDrawerClosed() {
  visible.value = false
  uni.showToast({
    title: '关闭',
    icon: 'none',
  })
}
</script>

<template>
  <div class="p-3">
    <GuoduModal
      :visible="visible"
      :mask-click="maskClick"
      :radius="showRadius"
      @close="onDrawerClosed"
    >
      <template #header>
        <GuoduDrawerHeader title="抽屉/弹窗" @close="visible = false" />
      </template>
      <div class="p-3 w-600rpx">
        这是弹窗里面的内容
      </div>
    </GuoduModal>
    <button class="btn" @tap="visible = true">
      打开
    </button>
    <div class="mt-3 flex gap-3 justify-start items-center">
      是否开启圆角 <switch :checked="showRadius" @change="(e: any) => showRadius = e.detail.value" />
    </div>
    <div class="mt-3 flex gap-3 justify-start items-center">
      点击阴影触发关闭 <switch :checked="maskClick" @change="(e: any) => maskClick = e.detail.value" />
    </div>
  </div>
</template>
