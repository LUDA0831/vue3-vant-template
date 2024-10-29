import { defineStore } from 'pinia'

export const useRouteStore = defineStore('app-route', () => {
  const keepAliveComponents = ref<string[]>([])
  const getKeepAliveComponents = computed(() => keepAliveComponents.value)

  const addKeepAliveComponents = (compNames: string) => {
    if (keepAliveComponents.value.includes(compNames)) {
      return
    }
    keepAliveComponents.value.push(compNames)
  }

  const deleteKeepAliveComponents = (compNames: string) => {
    // keepAliveComponents 使用 findIndex 与 当前路由对比，如果存在则返回具体下标位置，不存在返回 -1
    const index = keepAliveComponents.value.findIndex(name => name === compNames)
    if (index !== -1) {
      // 通过返回具体下标位置删除 keepAliveComponents 数组中缓存的 元素
      keepAliveComponents.value.splice(index, 1)
    }
  }

  return { keepAliveComponents, addKeepAliveComponents, deleteKeepAliveComponents, getKeepAliveComponents }
})
