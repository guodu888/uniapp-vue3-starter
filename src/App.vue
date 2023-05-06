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
</script>

<style lang="scss">
/*每个页面公共css */
@import "./styles/main.scss";
</style>
