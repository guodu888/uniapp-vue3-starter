<script setup lang="ts">
function to(path: string) {
  uni.navigateTo({
    url: path,
  })
}
const userStore = useUserStore()
function handleLogout() {
  userStore.logout().then(() => {
    // 重定向到登录页面
    uni.redirectTo({
      url: '/pages/login/index',
    })
  })
}
</script>

<template>
  <view class="p-3">
    <button @tap="to('/pages/login/index')">
      To Login
    </button>
    <button @tap="handleLogout">
      Logout
    </button>
    <button @tap="to('/pages/icon/index')">
      To Icon
    </button>
    <button @tap="to('/pages/fetchPage/index')">
      To FetchPage
    </button>
  </view>
</template>
