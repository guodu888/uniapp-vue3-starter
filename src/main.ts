import { createSSRApp } from 'vue'
import App from '~/App.vue'
import 'uno.css'
const store = createPinia()

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
  }
}
