<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string
    type?: 'line' | 'circle' | 'circle2' }>(),
  {
    color: 'var(--guodu-loading)',
    type: 'line',
  })
const loadingColor = computed(() => props.color)
</script>

<template>
  <view v-if="type === 'line'" class="flex justify-center items-center">
    <view class="loading" />
  </view>
  <view v-else-if="type === 'circle'" class="flex justify-center items-center">
    <view class="loading1">
      <view v-for="i in 3" :key="i" />
    </view>
  </view>
  <view v-else class="flex justify-center items-center">
    <view class="loading2">
      <view v-for="i in 8" :key="i" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
$color: v-bind(loadingColor);
.loading {
  width: 30px;
  height: 30px;
  border: 2px solid $color;
  border-top-color: transparent;
  border-radius: 100%;
  animation: circle infinite 0.75s linear;
}

// 转转转动画
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading,
.loading > view {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: $color;
}

.loading.la-dark {
  color: $color;
}

.loading1 > view {
  display: inline-block;
  float: none;
  background-color: $color;
  border: 0 solid $color;
}

.loading1 {
  width: 54px;
  height: 18px;
}

.loading1 > view {
  width: 10px;
  height: 10px;
  margin: 4px;
  border-radius: 100%;
  animation: ball-beat 0.7s -0.15s infinite linear;
}

.loading1 > view:nth-child(2n-1) {
  animation-delay: -0.5s;
}

@keyframes ball-beat {
  50% {
    opacity: 0.2;
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.loading2,
.loading2 > view {
  position: relative;
  box-sizing: border-box;
}

.loading2 {
  display: block;
  font-size: 0;
  color: $color;
}

.loading2.la-dark {
  color: $color;
}

.loading2 > view {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
  background-color: $color;
}

.loading2 {
  width: 32px;
  height: 32px;
}

.loading2 > view {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin-top: -4px;
  margin-left: -4px;
  border-radius: 100%;
  animation: ball-spin-clockwise-fade 1s infinite linear;
}

.loading2 > view:nth-child(1) {
  top: 5%;
  left: 50%;
  animation-delay: -0.875s;
}

.loading2 > view:nth-child(2) {
  top: 18.1801948466%;
  left: 81.8198051534%;
  animation-delay: -0.75s;
}

.loading2 > view:nth-child(3) {
  top: 50%;
  left: 95%;
  animation-delay: -0.625s;
}

.loading2 > view:nth-child(4) {
  top: 81.8198051534%;
  left: 81.8198051534%;
  animation-delay: -0.5s;
}

.loading2 > view:nth-child(5) {
  top: 94.9999999966%;
  left: 50.0000000005%;
  animation-delay: -0.375s;
}

.loading2 > view:nth-child(6) {
  top: 81.8198046966%;
  left: 18.1801949248%;
  animation-delay: -0.25s;
}

.loading2 > view:nth-child(7) {
  top: 49.9999750815%;
  left: 5.0000051215%;
  animation-delay: -0.125s;
}

.loading2 > view:nth-child(8) {
  top: 18.179464974%;
  left: 18.1803700518%;
  animation-delay: 0s;
}

.loading2.la-sm {
  width: 16px;
  height: 16px;
}

.loading2.la-sm > view {
  width: 4px;
  height: 4px;
  margin-top: -2px;
  margin-left: -2px;
}

.loading2.la-2x {
  width: 64px;
  height: 64px;
}

.loading2.la-2x > view {
  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-left: -8px;
}

.loading2.la-3x {
  width: 96px;
  height: 96px;
}

.loading2.la-3x > view {
  width: 24px;
  height: 24px;
  margin-top: -12px;
  margin-left: -12px;
}

@keyframes ball-spin-clockwise-fade {
  50% {
    opacity: 0.25;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
