import type { AlovaGenerics, AlovaMethodCreateConfig, Arg, RequestBody } from 'alova'
import { ContentTypeEnum } from '@/enums/httpEnum'
import { PageEnum } from '@/enums/pageEnum'
import { router } from '@/router'
import { useUserStore } from '@/stores/user'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { cloneDeep, throttle } from 'lodash-es'
import { showFailToast } from 'vant'

export interface ResOptions<T> {
  data: T
  code: number
  message: string
  success: boolean
}
function showErr(text: string) {
  showFailToast(text)
}
const authReject = throttle(() => {
  showErr('登录状态已过期，需要重新登录')
  const userStore = useUserStore()
  userStore.clearUserInfo()
  const curPath = router.currentRoute.value.path
  router.push({ name: PageEnum.LOGIN_NAME, replace: true, query: { redirect: curPath } })
}, 500)

function handleError(json: ResOptions<any>) {
  if (!json) {
    showErr('请求超时，服务器无响应！')
    return
  }
  if (json.code === 401) {
    authReject()
    return
  }
  showErr(json.message)
}

function paramsSerializer(params: Arg) {
  const query = cloneDeep(params)
  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === 'object' && Array.isArray(val) && val !== null) {
      query[`${key}[]`] = toRaw(val).map((v: any) => JSON.stringify(v))
      delete query[key]
    }
  })
  return query
}

const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  timeout: 50000,
  beforeRequest(method) {
    method.config.headers['Content-Type'] = ContentTypeEnum.JSON
    // 处理params
    method.config.params = paramsSerializer(method.config.params)
    const userStore = useUserStore()

    if (!userStore.isLogin)
      return
    // 假设我们需要添加token到请求头
    method.config.headers.Authorization = `Bearer ${userStore.getToken}`
  },
  responded: {
    onSuccess: async (response, methodInstance) => {
      const json = await response.json()
      // 不处理错误
      if (methodInstance.meta?.ignoreErr) {
        return json
      }
      if (json?.code !== 200) {
        handleError(json)
        return Promise.reject(json)
      }
      return json
    },
    onError: (err) => {
      console.error(err)
    },
  },
})
export type HttpConfig<R> = AlovaMethodCreateConfig<AlovaGenerics, ResOptions<R>, ResOptions<R>>
// 自动导出
export const useHttp = {
  get: <R>(url: string, params?: Arg, config?: HttpConfig<R>) => {
    return alovaInstance.Get<ResOptions<R>>(url, { ...config, params })
  },

  post: <R>(url: string, body?: RequestBody, config?: HttpConfig<R>) => {
    return alovaInstance.Post<ResOptions<R>>(url, body, config)
  },

  put: <R>(url: string, body?: RequestBody, config?: HttpConfig<R>) => {
    return alovaInstance.Put<ResOptions<R>>(url, body, config)
  },

  delete: <R>(url: string, body?: RequestBody, config?: HttpConfig<R>) => {
    return alovaInstance.Delete<ResOptions<R>>(url, body, config)
  },
}
