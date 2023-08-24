<!--
 * @Author: shaohang-shy
 * @Date: 2023-08-24 16:53:04
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-08-24 17:14:11
 * @Description: guodu-modal
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  visible: boolean // 是否显示
  mask?: boolean // 蒙层显示状态
  maskClick?: boolean // 点击遮罩是否可以关闭
  radius?: boolean | number // 是否圆角
}>(), {
  visible: false,
  mask: true,
  maskClick: true,
  radius: false,
})
const emits = defineEmits(['close', 'open'])
const visibleSync = ref(false)
const showModal = ref(false)
let watchTimer: number | null = null
function close() {
  showModal.value = false
  if (watchTimer) {
    clearTimeout(watchTimer)
    watchTimer = null
  }
  watchTimer = setTimeout(() => {
    visibleSync.value = false
    emits('close')
  }, 300)
}
function open() {
  visibleSync.value = true
  if (watchTimer) {
    clearTimeout(watchTimer)
    watchTimer = null
  }
  watchTimer = setTimeout(() => {
    showModal.value = true
    emits('open')
  }, 0)
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
  { immediate: true },
)
const radiusSize = computed(() => {
  if (props.radius === true)
    return '10px'
  if (typeof props.radius === 'number')
    return `${props.radius}px`
  return '0px'
})
</script>

<template>
  <view
    v-if="visibleSync"
    :class="{ 'guodu-modal--visible': showModal }"
    class="guodu-modal"
  >
    <view
      class="guodu-modal__mask"
      :class="{ 'guodu-modal__mask--visible': showModal && props.mask }"
      @tap="handleTap"
    >
      <view
        class="guodu-modal__content"
        :class="{ 'guodu-modal__content--visible': showModal }"
      >
        <slot name="header" />
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$modal-radius: v-bind(radiusSize);
.guodu-modal {
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
.guodu-modal__content {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  position: absolute;
  background-color: var(--guodu-drawer-bg-color);
  transition: transform 0.3s ease;
  border-radius: $modal-radius;
  box-sizing: border-box;
}
.guodu-modal__mask {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--guodu-drawer-bg-color-mask);
  transition: opacity 0.3s;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.guodu-modal__mask--visible {
  opacity: 1;
}
</style>
