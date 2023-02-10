<script setup lang="ts">
const t = useTheme()
onLaunch(() => {
  // eslint-disable-next-line no-console
  console.log('App Launch')
  const userStore = useUserStore()
  userStore.getUserInfo()
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
