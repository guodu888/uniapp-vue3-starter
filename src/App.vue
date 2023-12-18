<script setup lang="ts">
const t = useTheme()
onLaunch(() => {
  // eslint-disable-next-line no-console
  console.log('App Launch')
  const userStore = useUserStore()
  // 判断有没有token
  if (!userStore.token) {
    // 没有token 跳转到登录页面
    uni.redirectTo({ url: '/pages/login/index' })
  }
  else {
    // 有token 跳转到首页
    uni.switchTab({ url: '/pages/index/index' })
  }
})
onShow(() => {
  // eslint-disable-next-line no-console
  console.log('App Show')
})
onHide(() => {
  // eslint-disable-next-line no-console
  console.log('App Hide')
})
uni.getSystemInfo({
  success(info) {
    t.setTheme(info.theme as 'light' | 'dark')
  },
})
onThemeChange(({ theme }) => {
  t.setTheme(theme)
})
// #ifdef H5
// 监听浏览器主题变化
function handler({ matches }: { matches: boolean }) {
  t.setTheme(matches ? 'dark' : 'light')
}
const mediaQuery = window!.matchMedia('(prefers-color-scheme: dark)')
handler(mediaQuery)
if ('addEventListener' in mediaQuery)
  mediaQuery.addEventListener('change', handler)
else
  // @ts-expect-error deprecated API
  mediaQuery.addListener(handler)
// #endif
</script>

<style lang="scss">
/*每个页面公共css */
@import "./styles/main.scss";
</style>
