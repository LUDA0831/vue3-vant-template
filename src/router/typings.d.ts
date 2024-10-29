import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    keepAlive?: boolean
    title?: string
    login?: boolean
  }
}
