<script setup lang="ts">
/**
 * guodu echarts 兼容uni-app
 * @description guodu echart兼容uni-app
 * @property {object} options 图表配置数据
 * @property {string} canvasId 画布id
 * @example <guodu-echarts ref="echarts" :options="options" canvasId="echarts"></guodu-echarts>
 */
import type { ECharts } from 'echarts'
import type { ECOption } from './echarts'
import echarts from './echarts'
import WxCanvas from './wx-canvas.js'

const props = defineProps<{
  canvasId: string
  options: ECOption
}>()
const emits = defineEmits(['click'])
const instance = getCurrentInstance()
const exposeObj: Record<string, any> = {} // 导出组件方法、echart实例
let chartInstance: ECharts
let ctx: any = null
const theme = useTheme()

onMounted(() => {
  echarts.registerPreprocessor((options: any) => {
    if (options && options.series) {
      if (options.series.length > 0) {
        options.series.forEach((series: { progressive: number }) => {
          series.progressive = 0
        })
      }
      else if (typeof options.series === 'object') {
        options.series.progressive = 0
      }
    }
  })
})

onBeforeUnmount(() => {
  chartInstance && chartInstance.dispose()
})

// #ifdef H5
// H5绘制图表
// eslint忽略下面的错误
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
function initChart(options: Record<string, any>) {
  ctx = uni.createCanvasContext(props.canvasId, instance)
  chartInstance = echarts.init(document.getElementById(props.canvasId)!, theme.current.value) as unknown as ECharts
  chartInstance.clear()
  chartInstance.setOption(options || props.options)
  chartInstance.on('click', (params) => {
    emits('click', params)
  })
  exposeObj.chart = chartInstance
}
// H5生成图片
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
function canvasToTempFilePath(opt: { success: (arg0: { tempFilePath: string }) => any }) {
  const base64 = chartInstance.getDataURL()
  opt.success && opt.success({ tempFilePath: base64 })
}
exposeObj.canvasToTempFilePath = canvasToTempFilePath
// #endif
// #ifndef H5
// 绘制图表
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line ts/no-redeclare
async function initChart(options: Record<string, any>) {
  const canvasAttr = await getCanvasAttr()
  const { canvas, canvasWidth, canvasHeight, canvasDpr } = canvasAttr
  chartInstance = echarts.init(canvas, theme.current.value, {
    width: canvasWidth,
    height: canvasHeight,
    devicePixelRatio: canvasDpr, // new
  }) as unknown as ECharts
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  canvas.setChart(chartInstance)
  chartInstance.clear()
  chartInstance.setOption(options || props.options)
  chartInstance.on('click', (params) => {
    emits('click', params)
  })
  exposeObj.chart = chartInstance
}
// 生成图片
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line ts/no-redeclare
function canvasToTempFilePath(opt: UniApp.CanvasToTempFilePathOptions) {
  // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
  const query = uni
    .createSelectorQuery()
    // #ifndef MP-ALIPAY
    .in(instance)
  // #endif
  query
    .select(`#${props.canvasId}`)
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    .fields({ node: true, size: true })
    .exec((res) => {
      const canvasNode = res[0].node
      opt.canvas = canvasNode
      uni.canvasToTempFilePath(opt, instance)
    })
  // #endif
  // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
  if (!opt.canvasId)
    opt.canvasId = props.canvasId

  ctx.draw(true, () => {
    uni.canvasToTempFilePath(opt, instance)
  })
  // #endif
}
exposeObj.canvasToTempFilePath = canvasToTempFilePath
// #endif
function getCanvasAttr(): Promise<{
  canvas: HTMLCanvasElement
  canvasWidth: number
  canvasHeight: number
  canvasDpr: number
}> {
  // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
  return new Promise((resolve, _reject) => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select(`#${props.canvasId}`)
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvasNode = res[0].node
        const canvasDpr = uni.getSystemInfoSync().pixelRatio
        const canvasWidth = res[0].width
        const canvasHeight = res[0].height
        ctx = canvasNode.getContext('2d')

        const canvas = new WxCanvas(ctx, props.canvasId, true, canvasNode) as unknown as HTMLCanvasElement
        echarts.setPlatformAPI({
          createCanvas: () => canvas,
        })
        resolve({
          canvas,
          canvasWidth,
          canvasHeight,
          canvasDpr,
        })
      })
  })
  // #endif
  // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO

  return new Promise((resolve, _reject) => {
    ctx = uni.createCanvasContext(props.canvasId, instance)
    const canvas = new WxCanvas(ctx, props.canvasId, false, null)
    echarts.setPlatformAPI({
      createCanvas: () => canvas as unknown as HTMLCanvasElement,
    })
    const canvasDpr = 1
    const query = uni
      .createSelectorQuery()
      // #ifndef MP-ALIPAY
      .in(instance)
    // #endif
    query
      .select(`#${props.canvasId}`)
      .boundingClientRect((res) => {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        const canvasWidth = res.width
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        const canvasHeight = res.height
        resolve({
          canvas,
          canvasWidth,
          canvasHeight,
          canvasDpr,
        } as unknown as {
          canvas: HTMLCanvasElement
          canvasWidth: number
          canvasHeight: number
          canvasDpr: number
        })
      })
      .exec()
  })
  // #endif
}

function touchStart(e: TouchEvent) {
  if (chartInstance && e.touches.length > 0) {
    const touch = e.touches[0] as unknown as { x: number, y: number }
    const handler = chartInstance.getZr().handler
    handler.dispatch('mousedown', {
      zrX: touch.x,
      zrY: touch.y,
    })
    handler.dispatch('mousemove', {
      zrX: touch.x,
      zrY: touch.y,
    })
    handler.processGesture(wrapTouch(e), 'start')
  }
}
function touchMove(e: TouchEvent) {
  if (chartInstance && e.touches.length > 0) {
    const touch = e.touches[0] as unknown as { x: number, y: number }
    const handler = chartInstance.getZr().handler
    handler.dispatch('mousemove', {
      zrX: touch.x,
      zrY: touch.y,
    })
    handler.processGesture(wrapTouch(e), 'change')
  }
}
function touchEnd(e: TouchEvent) {
  if (chartInstance) {
    const touch = (e.changedTouches ? e.changedTouches[0] : {}) as unknown as { x: number, y: number }
    const handler = chartInstance.getZr().handler
    handler.dispatch('mouseup', {
      zrX: touch.x,
      zrY: touch.y,
    })
    handler.dispatch('click', {
      zrX: touch.x,
      zrY: touch.y,
    })
    handler.processGesture(wrapTouch(e), 'end')
  }
}
function wrapTouch(event: TouchEvent): any {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i] as unknown as { x: number, y: number, offsetX: number, offsetY: number }
    touch.offsetX = touch.x
    touch.offsetY = touch.y
  }
  return event
}

watch(
  props.options,
  (newValue, _oldValue) => {
    if (newValue?.series) {
      nextTick(() => {
        if (!chartInstance)
          initChart(newValue)
        else
          chartInstance.setOption(newValue)
      })
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(theme.current, () => {
  initChart(props.options)
})
defineExpose(exposeObj) // 导出组件方法、echart实例
</script>

<template>
  <!-- #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
  <canvas
    :id="canvasId" type="2d" class="echarts" :canvas-id="canvasId" @touchstart="touchStart" @touchmove="touchMove"
    @touchend="touchEnd"
  />
  <!-- #endif -->
  <!-- #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
  <canvas
    :id="canvasId" class="echarts" :canvas-id="canvasId" @touchstart="touchStart" @touchmove="touchMove"
    @touchend="touchEnd"
  />
  <!-- #endif -->
</template>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
