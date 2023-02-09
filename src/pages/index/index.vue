<script setup lang="ts">
function handleToLogin() {
  uni.navigateTo({
    url: '/pages/login/index',
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
    Index
    <button plain @tap="handleToLogin">
      To Login
    </button>
    <button plain @tap="handleToFetchPage">
      To FetchPage
    </button>
  </view>
</template>
