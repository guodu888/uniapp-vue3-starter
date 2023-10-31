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
  <view class="flex flex-col w-full justify-center items-center" style="padding-top: 150rpx;">
    <!-- 头部logo -->
    <image class="h-150 w-150" src="~/~/static/logo.png" />
    <!-- 账号 -->
    <input v-model="account" type="text" placeholder="请输入账号" class="input px-5 my-5 rounded-full shadow-$box-shadow-3 h-100 w-80%" style="margin-top: 50rpx;">
    <!-- 密码 -->
    <input v-model="pwd" type="password" placeholder="请输入密码" class="input px-5 my-5 rounded-full shadow-$box-shadow-3 h-100 w-80%">
    <!-- 登录按钮 -->
    <button class="btn btn-primary" @tap="handleLogin">
      登录
    </button>
    <!-- 快捷登录 -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="flex flex-col fixed justify-center items-center bottom-50">
      <image class="p-2 rounded-50rpx shadow-$box-shadow-1 h-80 w-80" src="../../static/icon/wechat.png" @tap="handleLoginByCode" />
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
