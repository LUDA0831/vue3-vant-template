import { setupStore } from '@/stores'
import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from './router'

import '@vant/touch-emulator'
import '@unocss/reset/tailwind-compat.css'
import 'vant/lib/index.css'
import './assets/styles/index.css'
import 'virtual:uno.css'

async function bootstrap() {
  const app = createApp(App)
  // 挂载状态管理
  setupStore(app)
  // 挂载路由
  setupRouter(app)
  await router.isReady()
  // 路由准备就绪后挂载APP实例
  app.mount('#app', true)
}

bootstrap().then()
