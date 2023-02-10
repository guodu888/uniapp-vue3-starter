<!--
 * @Author: Arthur_Zhang
 * @Date: 2023-02-09 14:51:27
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-10 09:38:39
 * @Description:
-->
<script setup lang="ts">
const data = ref()

function handleToLogin() {
  uni.navigateTo({
    url: '/pages/login/index',
  })
}
function handleToTest() {
  uni.navigateTo({
    url: '/pages/test/index',
  })
}
</script>

<template>
  <view class="p-3">
    {{ data }}
    Index
    <button plain @tap="handleToLogin">
      To Login
    </button>
    <button class="mt-20rpx" plain @tap="handleToTest">
      To test
    </button>
  </view>
</template>
