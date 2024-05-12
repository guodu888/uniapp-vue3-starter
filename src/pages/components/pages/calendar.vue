<!--
 * @Author: shaohang-shy
 * @Date: 2023-07-14 16:29:04
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-08-11 14:32:26
 * @Description: calendar
-->
<script setup lang="ts">
const selectTime = ref(new Date().getTime())
const selectTimeFormat = useDateFormat(selectTime, 'YYYY-MM-DD')
const showSelectTime = ref(false)

const selectTimeRange = ref<[number, number]>([new Date().getTime(), new Date().getTime() + 60 * 60 * 24 * 7 * 1000])
const selectTimeRangeFormat = computed(() => {
  return selectTimeRange.value.map(e => useDateFormat(e, 'YYYY-MM-DD').value)
})
const showSelectTimeRange = ref(false)
</script>

<template>
  <div class="p-3">
    <GuoduCalendar mode="week" :value="0" :start-week="0" />
    <view class="mt-3">
      {{ selectTimeFormat }}
    </view>
    <button class="btn mt-3" @tap="showSelectTime = true">
      选择时间
    </button>
    <GuoduDrawer :visible="showSelectTime" :radius="14" mode="bottom" size="auto" @close="showSelectTime = false">
      <GuoduCalendar :value="selectTime" mode="single" @cancel="showSelectTime = false" @submit="(e: any) => (selectTime = e, showSelectTime = false)" />
    </GuoduDrawer>
    <view class="mt-3">
      {{ selectTimeRangeFormat.join('~') }}
    </view>
    <button class="btn mt-3" @tap="showSelectTimeRange = true">
      选择时间范围
    </button>
    <GuoduDrawer :visible="showSelectTimeRange" :radius="14" mode="bottom" size="auto" @close="showSelectTimeRange = false">
      <GuoduCalendar :value="selectTimeRange" mode="range" @cancel="showSelectTimeRange = false" @submit="(e: any) => (selectTimeRange = e, showSelectTimeRange = false)" />
    </GuoduDrawer>
  </div>
</template>
