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
    <guodu-modal
      :visible="visible"
      :mask-click="maskClick"
      :radius="showRadius"
      @close="onDrawerClosed"
    >
      <template #header>
        <guodu-drawer-header title="抽屉/弹窗" @close="visible = false" />
      </template>
      <div class="w-600rpx p-3">
        这是弹窗里面的内容
      </div>
    </guodu-modal>
    <button class="btn" @tap="visible = true">
      打开
    </button>
    <div class="flex mt-3 justify-start items-center gap-3">
      是否开启圆角 <switch :checked="showRadius" @change="(e: any) => showRadius = e.detail.value" />
    </div>
    <div class="flex mt-3 justify-start items-center gap-3">
      点击阴影触发关闭 <switch :checked="maskClick" @change="(e: any) => maskClick = e.detail.value" />
    </div>
  </div>
</template>
