import type { ConfigEnv, UserConfig } from 'vite'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { loadEnv } from 'vite'
import { createViteBuild, createVitePlugins, wrapperEnv } from './build'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_APP_PORT } = viteEnv
  return {
    plugins: createVitePlugins(viteEnv, command === 'build'),
    build: createViteBuild(),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: VITE_APP_PORT || 3000,
    },
    optimizeDeps: {
      include: [
        'dayjs/locale/zh-cn',
        'dayjs/plugin/relativeTime.js',
        'lodash-es',
        'lottie-web',
        '@tybys/jweixin',
        'dplayer',
      ],
    },
  }
}
