<script setup lang="ts">
const userStore = useUserStore()
const account = ref('')
const pwd = ref('')
// 判断是否有token
if (userStore.token) {
  // 有token 跳转到我的页面
  // 获取userInfo
  userStore.getUserInfo().then(() => {
    uni.switchTab({ url: '/pages/index/index' })
  })
}

function handleLogin() {
  // 验证参数
  if (account.value.trim() === '') {
    uni.showToast({ icon: 'none', title: '请输入账号' })
    return
  }
  if (pwd.value.trim() === '') {
    uni.showToast({ icon: 'none', title: '请输入密码' })
    return
  }
  userStore.login(account.value.trim(), pwd.value.trim()).then(() => {
    // 登录成功 跳转到我的页面
    uni.switchTab({ url: '/pages/mine/index' })
  })
}
function handleLoginByCode() { }
</script>

<template>
  <view class="w-full flex flex-col items-center justify-center" style="padding-top: 150rpx;">
    <!-- 头部logo -->
    <image class="h-150 w-150" src="~/~/static/logo.png" />
    <!-- 账号 -->
    <input v-model="account" type="text" placeholder="请输入账号" class="input my-5 h-100 w-80% rounded-full px-5 shadow-$box-shadow-3" style="margin-top: 50rpx;">
    <!-- 密码 -->
    <input v-model="pwd" type="password" placeholder="请输入密码" class="input my-5 h-100 w-80% rounded-full px-5 shadow-$box-shadow-3">
    <!-- 登录按钮 -->
    <button class="btn btn-primary" @tap="handleLogin">
      登录
    </button>
    <!-- 快捷登录 -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="fixed bottom-50 flex flex-col items-center justify-center">
      <image class="h-80 w-80 rounded-50rpx p-2 shadow-$box-shadow-1" src="../../static/icon/wechat.png" @tap="handleLoginByCode" />
    </view>
    <!-- #endif -->
  </view>
</template>

<style>
.btn {
  margin-top: 50rpx;
  width: 80%;
  border-radius: 999rpx;
  box-shadow: var(--box-shadow-3);
}

.uni-input:focus{
  border: 1px solid red;
}
</style>
