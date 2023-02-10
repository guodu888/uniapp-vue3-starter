<!--
 * @Author: Arthur_Zhang
 * @Date: 2023-02-10 15:01:13
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-10 18:39:40
 * @Description:
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    link?: boolean
    extClass?: string
    iconClass?: string
    icon?: string
    title?: string // 和icon二选一，都是放在cell_hd里面
    value?: string
    footerClass?: string
    footer?: string
    hasHeader?: boolean
    hasFooter?: boolean
    hasBody?: boolean
  }>(),
  {
    link: false,
    extClass: '',
    iconClass: '',
    icon: '',
    title: '',
    value: '',
    footerClass: '',
    footer: '',
    hasHeader: true,
    hasFooter: true,
    hasBody: true,
  },
)
const outerClass = ''
const inForm = true
function navigateTo() {}
</script>

<template>
  <view
    class="weui-cell"
    :class="[
      link ? 'weui-cell_access' : '',
      extClass,
      outerClass,
      inForm ? ' weui-cell-inform' : '',
    ]"
    @tap="navigateTo"
  >
    <view v-if="hasHeader" class="weui-cell__hd" :class="[iconClass]">
      <block v-if="icon">
        <image :src="icon" class="weui-cell__icon" mode="aspectFit" />
      </block>
      <block v-else>
        <slot name="icon" />
      </block>
      <block v-if="title">
        {{ title }}
      </block>
      <block v-else>
        <slot name="title" />
      </block>
    </view>
    <view v-if="hasBody" class="weui-cell__bd">
      <block v-if="value">
        {{ value }}
      </block>
      <block v-else>
        <slot />
      </block>
    </view>
    <view
      v-if="hasFooter"
      class="weui-cell__ft"
      :class="[props.footerClass]"
    >
      <block v-if="footer">
        {{ footer }}
      </block>
      <block v-else>
        <slot name="footer" />
      </block>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.weui-cell {
  padding: 32rpx;
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1.41176471;
  font-size: 34rpx;
  color: var(--weui-FG-0);
  background-color: var(--bg-color);

}
.weui-cell_access {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
  &:active {
    background-color: var(--bg-active-color);
  }
}

.weui-cell_access .weui-cell__ft {
  color: var(--text-color-3);
  padding-right: 48rpx;
  position: relative;
}
.weui-cell_access:after {
  content: " ";
  width: 24rpx;
  height: 48rpx;
  background-color: currentColor;
  color: var(--weui-FG-2);
  // -webkit-mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);
  mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -24rpx;
}

.weui-cell__hd {
  padding-right: 32rpx;
}
.weui-label {
  display: block;
  width: 210rpx;
  word-wrap: break-word;
  word-break: break-all;
}
.weui-cell__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  min-width: 0;
}
.weui-cell__ft {
  text-align: right;
  color: var(--text-color-3);
}

.weui-cell__icon {
  display: inline-block;
  vertical-align: middle;
  width: 24rpx;
  height: 24rpx;
  margin: -0.2em 0.34em 0 0;
}
</style>
