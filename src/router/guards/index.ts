import type { Router } from 'vue-router/auto'
import { createKeepAliveGuard } from '@/router/guards/keepAlive'
import { createPermissionGuard } from '@/router/guards/permission'

export function createRouterGuards(router: Router) {
  createPermissionGuard(router)
  createKeepAliveGuard(router)

  router.onError((error) => {
    console.error(error, '路由错误')
  })
}
