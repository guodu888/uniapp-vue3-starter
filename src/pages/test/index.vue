<!--
 * @Author: Arthur_Zhang
 * @Date: 2023-02-10 09:36:24
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-10 14:35:29
 * @Description:
-->
<script setup lang='ts'>
const showStudentBottomPop = ref(false)
function handleShowBottomPop() {
  showStudentBottomPop.value = !showStudentBottomPop.value
}
function handleCloseBottomPop() {
  showStudentBottomPop.value = false
}
const showStudentLeftPop = ref(false)
function handleShowLeftPop() {
  showStudentLeftPop.value = !showStudentBottomPop.value
}
function handleCloseLeftPop() {
  showStudentLeftPop.value = false
}
</script>

<template>
  <div>
    <button @tap="handleShowBottomPop">
      bottom pop
    </button>
    <guodu-drawer
      :visible="showStudentBottomPop"
      :mask-click="true"
      mode="bottom"
      size="50vh"
      @close="handleCloseBottomPop"
    >
      bottom pop
    </guodu-drawer>
    <button @tap="handleShowLeftPop">
      bottom left
    </button>
    <guodu-drawer
      :visible="showStudentLeftPop"
      :mask-click="true"
      mode="left"
      @close="handleCloseLeftPop"
    >
      bottom left
    </guodu-drawer>
    <guodu-seletor icon="" />
    <guodu-seletor max-width="400rpx" text="wo我是" />
  </div>
</template>
