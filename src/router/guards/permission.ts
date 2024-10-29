import type { Router } from 'vue-router/auto'
import { PageEnum } from '@/enums/pageEnum'

const LOGIN_PATH = PageEnum.LOGIN
const whitePathList = [LOGIN_PATH] // no redirect whitelist
const APP_TITLE = import.meta.env.VITE_APP_TITLE

interface RedirectData {
  path: string
  replace: boolean
  query?: Recordable<string>
}

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, from, next) => {
    // to: 即将要进入的目标
    // from: 当前导航正要离开的路由

    // 修改页面title
    useTitle(to.meta.title || APP_TITLE)
    if (from.path === LOGIN_PATH && to.name === PageEnum.ERROR_PAGE_NAME) {
      next(LOGIN_PATH)
      return
    }
    // 白名单可以直接进入
    if (whitePathList.includes(to.path as PageEnum)) {
      // 已经登录的不能进入登录页面,重定向到指定页面或者主页
      if (to.path === LOGIN_PATH && userStore.isLogin) {
        next({ path: (to.query?.redirect as string) || '/', replace: true })
        return
      }
      next()
      return
    }
    // 页面需要登录
    if (to.meta.login && !userStore.getToken) {
      // 重定向到登录页面
      const redirectData: RedirectData = { path: LOGIN_PATH, replace: true }
      if (to.path)
        redirectData.query = { ...redirectData.query, redirect: to.path }

      next(redirectData)
      return
    }
    next()
  })
}
