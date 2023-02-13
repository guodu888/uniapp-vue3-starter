<script setup lang="ts">
interface TabsItem {
  field?: string
  disabled?: boolean
}
const props = withDefaults(
  defineProps<{
    value?: number
    tabs: string [] | TabsItem []
    bgColor?: string
    color?: string
    activeColor?: string
    fontSize?: string
    bold?: boolean
    scroll?: boolean
    height?: string
    lineColor?: string
    lineScale?: string
    lineRadius?: string
    pills?: boolean
    pillsColor?: string
    pillsBorderRadius?: string
    field?: string
    fixed?: boolean
    paddingItem?: string
    lineAnimation?: boolean
    padding?: string | number
    lineHeight?: string
  }>(),
  {
    value: 0, // 选中的下标
    tabs: () => [], // tabs 列表
    bgColor: 'var(--bg-color)', // 背景颜色
    color: 'var(--text-color)', // 文字颜色
    activeColor: '#2979ff', // 选中文字颜色
    fontSize: '28rpx', // 选中文字大小
    bold: true, // 选中文字是否加粗
    scroll: true, // 是否滚动
    height: '70rpx', // 的高度
    lineColor: '#2979ff', // 下划线的颜色
    lineScale: '0.5', // 下划线的宽度缩放比例
    lineRadius: '10rpx', // 下划线圆角
    pills: false, // 是否胶囊样式
    pillsColor: '#2979ff', // 胶囊背景色
    field: '', // 如果是对象，显示的键名
    fixed: false, // 是否固定
    paddingItem: '0', // 选项的边距
    lineAnimation: true, // 下划线是否有动画
    padding: 0,
    lineHeight: '10rpx',
  },
)
const emits = defineEmits(['update:value'])
const elId = ref('')
const lineWidth = ref(30)
const currentWidth = ref(0) // 当前选项的宽度
const lineLeft = ref(0) // 滑块距离左侧的位置
const pillsLeft = ref(0) // 胶囊距离左侧的位置
const scrollLeft = ref(0) // 距离左边的位置
const containerWidth = ref(0) // 容器的宽度
// const current = ref(0) // 当前选中项
const itemInfo = ref<any>([])
onMounted(() => {
  init()
})
const tmpTabs = computed<TabsItem[]>(() => {
  // const tmpArr: TabsItem[] = []
  // props.tabs.forEach((x: TabsItem): void => {
  //   tmpArr.push({
  //     disabled: x!.disabled || false,
  //     field: x!.field || x as string,
  //   })
  // })
  // return tmpArr
  return props.tabs.map((item) => {
    if (typeof item === 'string') {
      return {
        disabled: false,
        field: item,
      }
    }
    return item
  })
})

function init() {
  elId.value = `xfjpeter_${randomString()}`
  // props.value = props.value
  getTabItemWidth()
}
function randomString(len?: number) {
  len = len || 32
  const $chars
    = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  return pwd
}
// 获取左移动位置
function getTabItemWidth() {
  const instance = getCurrentInstance() // 获取组件实例
  const query = uni
    .createSelectorQuery()
    // #ifndef MP-ALIPAY
    .in(instance)
  // #endif
  // 获取容器的宽度
  query
    .select('#scrollContainer')
    .boundingClientRect((data: any) => {
      if (!containerWidth.value && data)
        containerWidth.value = data.width
    })
    .exec()
  // 获取所有的 tab-item 的宽度
  query
    .selectAll('.v-tabs__container-item')
    .fields({ size: true }, (data: any) => {
      itemInfo.value = data
      getPosition()
    })
    .exec()
}
// 切换事件
function change(index: number) {
  const isDisabled = tmpTabs.value[index].disabled
  if (props.value !== index && !isDisabled)
    emits('update:value', index)
}

watch(
  () => props.value,
  (val) => {
    getPosition()
  },
  { deep: true, immediate: true },
)
function getPosition() {
  let _lineLeft = 0
  let _currentWidth = 0
  if (itemInfo.value.length) {
    for (let i = 0; i < itemInfo.value.length; i++) {
      if (i < props.value)
        _lineLeft += itemInfo.value[i].width
      else if (i === props.value)
        _currentWidth = itemInfo.value[i].width
      else
        break
    }
  }
  // 当前滑块的宽度
  currentWidth.value = _currentWidth
  // 缩放后的滑块宽度
  lineWidth.value = _currentWidth * parseFloat(props.lineScale) * 1
  // 滑块作移动的位置
  lineLeft.value = _lineLeft + _currentWidth / 2
  // 胶囊距离左侧的位置
  pillsLeft.value = _lineLeft
  // 计算滚动的距离左侧的位置
  if (props.scroll)
    scrollLeft.value = lineLeft.value - containerWidth.value / 2
}
</script>

<template>
  <view :id="elId" class="v-tabs">
    <scroll-view
      id="scrollContainer"
      :scroll-x="scroll"
      :scroll-left="scroll ? scrollLeft : 0"
      :scroll-with-animation="scroll"
      :style="{ position: fixed ? 'fixed' : 'relative' }"
    >
      <view
        class="v-tabs__container"
        :style="{
          display: scroll ? 'inline-flex' : 'flex',
          whiteSpace: scroll ? 'nowrap' : 'normal',
          background: bgColor,
          height,
          padding,
        }"
      >
        <view
          v-for="(v, i) in tmpTabs"
          :key="i"
          class="v-tabs__container-item"
          :class="[{ disabled: !!v?.disabled }]"
          :style="{
            color: props.value === i ? activeColor : props.color,
            fontSize: value === i ? fontSize : fontSize,
            fontWeight: bold && value === i ? 'bold' : 'normal',
            justifyContent: !scroll ? 'center' : '',
            flex: scroll ? '' : 1,
            padding: paddingItem,
          }"
          @click="change(i)"
        >
          {{ v?.field }}
        </view>
        <view
          v-if="!pills"
          class="v-tabs__container-line"
          :class="[{ animation: lineAnimation }]"
          :style="{
            background: lineColor,
            width: `${lineWidth}px`,
            height: lineHeight,
            borderRadius: lineRadius,
            left: `${lineLeft}px`,
            transform: `translateX(-${lineWidth / 2}px)`,
          }"
        />
        <view
          v-else
          class="v-tabs__container-pills"
          :class="[{ animation: lineAnimation }]"
          :style="{
            background: pillsColor,
            borderRadius: pillsBorderRadius,
            left: `${pillsLeft}px`,
            width: `${currentWidth}px`,
            height,
          }"
        />
      </view>
    </scroll-view>
    <view
      class="v-tabs__placeholder"
      :style="{
        height: fixed ? height : '0',
        padding,
      }"
    />
  </view>
</template>

<style lang="scss" scoped>
.v-tabs {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  &__container {
    min-width: 100%;
    position: relative;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    &-item {
      display: flex;
      align-items: center;
      height: 100%;
      position: relative;
      z-index: 10;
      // padding: 0 11px;
      transition: all 0.3s;
      white-space: nowrap;
      &.disabled {
        opacity: 0.5;
        color: #999;
      }
    }

    &-line {
      position: absolute;
      bottom: 0;
    }

    &-pills {
      position: absolute;
      z-index: 9;
    }
    &-line,
    &-pills {
      &.animation {
        transition: all 0.3s linear;
      }
    }
  }
}
</style>
