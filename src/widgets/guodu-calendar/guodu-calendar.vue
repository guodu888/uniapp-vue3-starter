<!--
 * @Author: shaohang-shy
 * @Date: 2023-07-14 16:26:24
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-07-14 16:26:24
 * @Description: guodu-calendar
-->
<script setup lang="ts">
import type { DateItem } from './util'
import { Calendar } from './util'
const props = withDefaults(defineProps<{
  defaultTime?: number // 默认日期
  mode: 'single' | 'range' // 选择模式
  value: number | [number, number] // 毫秒时间戳 一个时间戳表示选中的日期，或者一个时间戳数组表示选中的日期区间
}>(), {
  defaultTime: new Date().getTime(),
})
const emits = defineEmits(['submit', 'cancel'])
const selectTime = ref(props.value)
const now = props.defaultTime ? new Date(props.defaultTime) : new Date()
const year = ref(now.getFullYear())
const month = ref(now.getMonth() + 1)
// 获取YYYY-MM
const date = computed(() => `${year.value}-${month.value.toString().padStart(2, '0')}`)
function changeDate(v: string) {
  const [y, m] = v.split('-')
  year.value = Number(y)
  month.value = Number(m)
}
function handleChangeLastMonth() {
  if (month.value === 1) {
    year.value -= 1
    month.value = 12
  }
  else {
    month.value -= 1
  }
}
function handleChangeNextMonth() {
  if (month.value === 12) {
    year.value += 1
    month.value = 1
  }
  else {
    month.value += 1
  }
}
const weekNames = ['日', '一', '二', '三', '四', '五', '六']
const calendar = ref(new Calendar(date.value, Array.isArray(selectTime.value) ? selectTime.value : [selectTime.value, selectTime.value]))
watch(date, (v) => {
  calendar.value.setDate(v)
})
// 如果props.value发生变化则重新计算
watch(selectTime, () => {
  calendar.value.setSelected(Array.isArray(selectTime.value) ? selectTime.value : [selectTime.value, selectTime.value])
})

// 判断有没有插槽
const hasSlot = (name: string) => {
  const slots = getCurrentInstance()?.slots
  return slots && slots[name]
}
let step = true
function handleSelectDay(day: DateItem) {
  if (!day.currentMonth)
    return
  const date = new Date(day.year, day.month, day.day)
  if (props.mode === 'single') {
    selectTime.value = date.getTime()
  }
  else {
    // 如果是区间选择
    if (step) {
      // 如果是第一次选择
      selectTime.value = [date.getTime(), date.getTime()]
      step = false
    }
    else {
      // 如果是第二次选择
      const start = (selectTime.value as [number, number])[0]
      const end = date.getTime()
      selectTime.value = [Math.min(start, end), Math.max(start, end)]
      step = true
    }
  }
}
function handleSubmit() {
  emits('submit', selectTime.value)
}
function handleCancel() {
  emits('cancel')
}
</script>

<template>
  <div class="w-full rounded-t-xl bg-white py-3">
    <!-- 头部 -->
    <div class="flex-center leading-80rpx">
      <div class="i-carbon:chevron-left px-5" @tap="handleChangeLastMonth" />
      <picker mode="date" fields="month" :value="date" @change="(e: any) => changeDate(e.detail.value)">
        {{ date }}
      </picker>
      <div class="i-carbon:chevron-right px-5" @tap="handleChangeNextMonth" />
    </div>
    <div class="grid grid-cols-7">
      <div v-for="week, idx in weekNames" :key="idx" class="flex-1 flex-center flex-col text-#333/80 h-80rpx">
        {{ week }}
      </div>
    </div>
    <div class="grid grid-cols-7 gap-y-5rpx">
      <div v-for="day in calendar.weeks" :key="`${day.month}-${day.day}`" class="h-80rpx" @tap="handleSelectDay(day)">
        <slot v-if="hasSlot('day')" name="day" :item="day" />
        <template v-else>
          <div class="w-full h-full flex-center p-5rpx" :class="{ 'text-#aaa': !day.currentMonth, 'bg-#F6F7FA': day.isSelected && day.currentMonth, 'rounded-r-full': day.isSelectedEnd && day.currentMonth, 'rounded-l-full': day.isSelectedStart && day.currentMonth }">
            <div class="w-full h-full flex-center" :class="{ 'bg-#0084ff text-white rounded-full': day.currentMonth && (day.isSelectedStart || day.isSelectedEnd) }">
              {{ day.day }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="w-full p-3 p-b-0 flex gap-3">
      <button class="flex-1 rounded-lg h-80rpx leading-80rpx bg-white b-solid b-1 b-#CAD1D9 text-36rpx" @tap="handleCancel">
        取消
      </button>
      <button class="flex-1 rounded-lg h-80rpx leading-80rpx bg-#0084ff text-white text-32rpx" @tap="handleSubmit">
        确定
      </button>
    </div>
  </div>
</template>
