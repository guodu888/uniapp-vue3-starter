<!--
 * @Author: Arthur_Zhang
 * @Date: 2023-02-09 17:39:35
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-10 09:34:15
 * @Description:
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    visible: boolean // 是否显示
    mode: 'left' | 'right' | 'top' | 'bottom' | ''
    mask?: boolean // 蒙层显示状态
    size?: string // 抽屉宽度|高度
    maskClick: boolean // 点击遮罩是否可以关闭
  }>(),
  {
    visible: false,
    mode: 'bottom',
    mask: true,
    size: '220',
    maskClick: true,
  },
)
const emits = defineEmits(['close', 'open'])
const visibleSync = ref(false)
const showDrawer = ref(false)
const watchTimer = ref<any>(null)
// 组件初始化
init()
function init() {
  visibleSync.value = props.visible
  setTimeout(() => {
    showDrawer.value = props.visible
  }, 100)
}
function close() {
  showDrawer.value = false
  if (watchTimer.value)
    clearTimeout(watchTimer.value)
  watchTimer.value = setTimeout(() => {
    visibleSync.value = false
    emits('close')
  }, 300)
}
function open() {
  visibleSync.value = true
  if (watchTimer.value)
    clearTimeout(watchTimer.value)
  watchTimer.value = setTimeout(() => {
    showDrawer.value = true
    emits('open')
  }, 50)
}
function handleTap() {
  if (!props.maskClick)
    return

  close()
}
watch(
  () => props.visible,
  (val: boolean) => {
    if (val)
      open()
    else close()
  },
)
const currentStyle = computed(() => {
  if (props.mode === 'bottom' || props.mode === 'top')
    return { height: props.size }
  else
    return { width: props.size }
},
)
</script>

<template>
  <view
    v-if="visibleSync"
    :class="{ 'guodu-drawer--visible': showDrawer }"
    class="guodu-drawer"
  >
    <view
      class="guodu-drawer__mask"
      :class="{ 'guodu-drawer__mask--visible': showDrawer && mask }"
      @tap="handleTap"
    />
    <view
      class="guodu-drawer__content"
      :class="{
        'guodu-drawer--right': mode === 'right',
        'guodu-drawer--left': mode === 'left',
        'guodu-drawer--bottom': mode === 'bottom',
        'guodu-drawer--top': mode === 'top',
        'guodu-drawer__content--visible': showDrawer,
      }"
      :style="currentStyle"
    >
      {{ visibleSync }}
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 抽屉宽度
$drawer-size: 220px;
$bg-color: #ffffff;
$bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色
.guodu-drawer {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 9999;
}

.guodu-drawer__content {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  position: absolute;

  background-color: $bg-color;
  transition: transform 0.3s ease;
}

.guodu-drawer--left {
  top: 0;
  width: $drawer-size;
  bottom: 0;
  left: 0;
  /* #ifdef APP-NVUE */
  transform: translateX(-$drawer-size);
  /* #endif */
  /* #ifndef APP-NVUE */
  transform: translateX(-100%);
  /* #endif */
}

.guodu-drawer--right {
  top: 0;
  width: $drawer-size;
  bottom: 0;
  right: 0;
  /* #ifdef APP-NVUE */
  transform: translateX($drawer-size);
  /* #endif */
  /* #ifndef APP-NVUE */
  transform: translateX(100%);
  /* #endif */
}
.guodu-drawer--bottom {
  left: 0;
  height: $drawer-size;
  right: 0;
  bottom: 0;
  /* #ifdef APP-NVUE */
  transform: translateY($drawer-size);
  /* #endif */
  /* #ifndef APP-NVUE */
  transform: translateY(100%);
  /* #endif */
}

.guodu-drawer--top {
  left: 0;
  height: $drawer-size;
  right: 0;
  top: 0;
  /* #ifdef APP-NVUE */
  transform: translateY(-$drawer-size);
  /* #endif */
  /* #ifndef APP-NVUE */
  transform: translateY(-100%);
  /* #endif */
}

.guodu-drawer__content--visible {
  transform: translateX(0px);
}

.guodu-drawer__mask {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $bg-color-mask;
  transition: opacity 0.3s;
}

.guodu-drawer__mask--visible {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  opacity: 1;
}
</style>
