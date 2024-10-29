declare type Recordable<T = any> = Record<string, T>
declare interface ViteEnv {
  VITE_APP_TITLE: string
  VITE_APP_PORT: number
  VITE_APP_BASE_URL: string
  VITE_APP_WS_URL: string
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli'
  VITE_APP_QINIU_DOMAIN: string
}
