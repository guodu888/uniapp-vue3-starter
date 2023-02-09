<script setup lang="ts">
import { useFetchPage } from '~/composables/useFetchPage'
import { api } from '~/config/api'

const sex = ref(0)
interface UserItem {
  id: number
  nickname: string
  tel: string
  sex: '1' | '2'
}
const { list, isLoading, isLoadAll, load, clear, next } = useFetchPage<UserItem>(api.getUserList)
load({ sex: sex.value })
watch(sex, () => {
  clear()
  load({ sex: sex.value })
})
onPullDownRefresh(() => {
  clear()
  load()?.then(() => {
    uni.stopPullDownRefresh()
  })
})
</script>

<template>
  <view class="p-3">
    <view class="flex w-full">
      <button @tap="sex = 0">
        全部
      </button>
      <button @tap="sex = 1">
        男的
      </button>
      <button @tap="sex = 2">
        女的
      </button>
    </view>
    <!-- list -->
    <view v-for="item in list" :key="item.id">
      {{ item.nickname }}
    </view>
    <view v-if="isLoading">
      正在加载
    </view>
    <view v-else-if="isLoadAll">
      加载完毕
    </view>
    <view v-else @tap="() => next()">
      加载更多
    </view>
  </view>
</template>
