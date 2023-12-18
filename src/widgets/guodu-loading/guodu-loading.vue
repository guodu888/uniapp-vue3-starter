<script setup lang="ts">
const props = withDefaults(defineProps<{
  color?: string
  type?: 'line-circle' | 'dot-line' | 'dot-circle'
}>(), {
  color: 'var(--text-color-3)',
  type: 'line-circle',
})
const loadingColor = computed(() => props.color)
</script>

<template>
  <view class="loading flex-center w-full">
    <view v-if="props.type === 'line-circle'" class="loading-line-circle" />
    <view v-else-if="props.type === 'dot-line'" class="loading-dot-line flex-center">
      <view v-for="i in 3" :key="i" class="item" />
    </view>
    <view v-else class="loading-dot-circle">
      <view v-for="i in 8" :key="i" class="item" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@use "sass:math";
$color: v-bind(loadingColor);

// 转转转动画
@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
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

.loading {
  &-line-circle {
    width: 30px;
    height: 30px;
    border: 2px solid $color;
    border-top-color: transparent;
    border-radius: 100%;
    animation: circle infinite 1s linear;
    color: $color;
  }

  &-dot-line {
    width: 54px;
    height: 18px;

    .item {
      width: 10px;
      height: 10px;
      margin: 4px;
      background-color: $color;
      border-radius: 100%;
      animation: ball-beat 0.7s -0.15s infinite linear;

      &:nth-child(2n-1) {
        animation-delay: -0.5s;
      }

    }
  }

  &-dot-circle {
    width: 32px;
    height: 32px;
    position: relative;

    .item {
      width: 8px;
      height: 8px;
      background-color: $color;
      border-radius: 100%;
      position: absolute;
      animation: ball-spin-clockwise-fade 1s infinite linear;
    }

    // 循环八个球成一个圆形
    @for $i from 1 through 8 {
      .item:nth-child(#{$i}) {
        top: calc(#{50% + 50% * math.cos(45deg * $i)} - 4px);
        left: calc(#{50% + 50% * math.sin(45deg * $i)} - 4px);
        animation-delay: #{0.125 * $i}s;
      }
    }
  }
}
</style>
