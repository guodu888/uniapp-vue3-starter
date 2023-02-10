<!--
 * @Author: Arthur_Zhang
 * @Date: 2023-02-09 14:51:27
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-10 09:41:31
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
function handleToFetchPage() {
  uni.navigateTo({
    url: '/pages/fetchPage/index',
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

    <button plain @tap="handleToTest">
      To test
    </button>

    <button plain @tap="handleToFetchPage">
      To FetchPage
    </button>
  </view>
</template>
