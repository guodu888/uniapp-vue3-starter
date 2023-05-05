<!--
 * @Author: shaohang-shy
 * @Date: 2023-05-05 17:11:40
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-05-05 17:11:40
 * @Description: nav-bar
-->
<script setup lang="ts">
const title = ref('导航栏')
const showBack = ref(true)
</script>

<template>
  <div class="p-3">
    <guodu-nav-bar :title="title" :show-back="showBack">
      <template #icon>
        返回
      </template>
    </guodu-nav-bar>
    <input v-model="title" class="border" placeholder="请输入导航栏">
    <div class="flex mt-3 justify-start items-center gap-3">
      显示返回图标 <switch :checked="showBack" @change="(e: any) => showBack = e.detail.value" />
    </div>
  </div>
</template>
