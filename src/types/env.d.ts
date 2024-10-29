/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_APP_PORT: number
  VITE_APP_BASE_URL: string
  VITE_APP_WS_URL: string
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
