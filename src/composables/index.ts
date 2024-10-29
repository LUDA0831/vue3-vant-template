import api from '@/apis/index'

export { useRouteParams, useRouteQuery } from '@vueuse/router'
export { useRequest, useWatcher } from 'alova/client'

export function useApi() {
  return api
}
