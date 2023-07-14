<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    extClass?: string
    childClass?: string
    title?: string
    footer?: string
  }>(),
  {
    extClass: '',
    childClass: '',
    title: '',
    footer: '',
  },
)
</script>

<template>
  <view class="weui-cells__group" :class="[props.extClass, props.childClass]">
    <view v-if="title" class="weui-cells__title">
      {{ title }}
    </view>
    <slot />
    <view v-if="footer" class="weui-cells__tips">
      {{ footer }}
    </view>
    <slot v-else name="footer" />
  </view>
</template>

<style lang="scss" scoped>
.weui-cells__title {
  margin-top: 24px;
}
.weui-cells__tips {
  margin-top: 8px;
  padding: 0 32px;
  color: var(--text-color-3);
}

.weui-cells__group {
  border: 0;
}
.weui-cells__group:first-child {
  margin-top: 0;
}

.weui-cells__title {
  margin-top: 16px;
  margin-bottom: 3px;
  padding-left: 16px;
  padding-right: 16px;
  color: var(--weui-FG-1);
  font-size: 14px;
  line-height: 1.4;
}
</style>
