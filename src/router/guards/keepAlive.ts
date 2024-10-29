import type { Router } from 'vue-router/auto'
import { isNavigationFailure } from 'vue-router'

export function createKeepAliveGuard(router: Router) {
  const routeStore = useRouteStore()

  // 进入某个路由之后触发的钩子
  router.afterEach((to, _, failure) => {
    if (isNavigationFailure(failure))
      throw new Error(`failed navigation ${failure}`)

    // 获取当前组件名
    const currentComName = to.matched.find(item => item.name === to.name)?.name as string
    if (!currentComName)
      return
    // 如果 currentComName 且 keepAliveComponents 不包含 currentComName 且 即将要进入的路由 meta 属性里 keepAlive 为 true，则缓存该组件
    if (to.meta?.keepAlive) {
      // 需要缓存的组件
      routeStore.addKeepAliveComponents(currentComName)
    }
    else if (!to.meta?.keepAlive) {
      // keepAlive 为 false 则不缓存
      // 这里的作用一开始组件设置为缓存，之后又设置不缓存但是它还是存在 keepAliveComponents 数组中
      routeStore.deleteKeepAliveComponents(currentComName)
    }
  })
}
