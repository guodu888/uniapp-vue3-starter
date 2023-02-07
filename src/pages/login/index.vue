<script setup lang="ts">
const account = ref('')
const pwd = ref('')
function handleLogin() { }
function handleLoginByCode() { }
</script>

<template>
  <view class="flex flex-col justify-center items-center w-full" style="padding-top: 150rpx;">
    <!-- 头部logo -->
    <image class="w-150 h-150" src="~/~/static/logo.png" />
    <!-- 账号 -->
    <input v-model="account" type="text" placeholder="请输入账号" class="w-80% h-100 shadow-$box-shadow-3 rounded-full my-5 px-5 input" style="margin-top: 50rpx;">
    <!-- 密码 -->
    <input v-model="pwd" type="password" placeholder="请输入密码" class="w-80% h-100 shadow-$box-shadow-3 rounded-full my-5 px-5 input">
    <!-- 登录按钮 -->
    <button class="btn btn-primary" @tap="handleLogin">
      登录
    </button>
    <!-- 快捷登录 -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="flex flex-col justify-center items-center fixed bottom-50">
      <image class="w-80 h-80 shadow-$box-shadow-1 rounded-50rpx p-2" src="../../static/icon/wechat.png" @tap="handleLoginByCode" />
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
