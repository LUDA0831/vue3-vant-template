import { getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'

export function createRouter() {
  return VueRouter({
    getRouteName: getPascalCaseRouteName,
  })
}
