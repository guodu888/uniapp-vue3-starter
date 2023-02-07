<script setup lang="ts">
function handleToLogin() {
  uni.navigateTo({
    url: '/pages/login/index',
  })
}
</script>

<template>
  <view class="p-3">
    Index
    <button plain @tap="handleToLogin">
      To Login
    </button>
  </view>
</template>
