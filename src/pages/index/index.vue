<script setup lang="ts">
function to(path: string) {
  uni.navigateTo({
    url: path,
  })
}
</script>

<template>
  <view class="p-3">
    <button @tap="to('/pages/login/index')">
      To Login
    </button>
    <button @tap="to('/pages/icon/index')">
      To Icon
    </button>
    <button @tap="to('/pages/fetchPage/index')">
      To FetchPage
    </button>
  </view>
</template>
