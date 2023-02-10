export const theme = ref<'dark' | 'light'>('light')
export function useTheme() {
  function setTheme(t: 'dark' | 'light') {
    theme.value = t
  }
  return {
    current: theme,
    setTheme,
  }
}
