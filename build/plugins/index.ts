import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild from 'rollup-plugin-esbuild'
import Unocss from 'unocss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createAutoImport } from './autoImport'
import { createComponents } from './components'
import { createCompression } from './compression'
import { createRouter } from './router'

export default function createVitePlugins(viteEnv: ViteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue({
      script: {
        propsDestructure: true,
      },
    }),
    // jsx支持
    vueJsx(),
    // 自动导入组件
    createComponents(),
    // 自动导入api
    createAutoImport(),
    // 自动路由
    createRouter(),
    // unocss
    Unocss(),
    // 开发工具
    vueDevTools({ launchEditor: 'webstorm' }),
    // 解决低版本浏览器可选链报错
    {
      ...esbuild({
        target: 'chrome70',
        // 如有需要可以在这里加 js ts 之类的其他后缀
        include: /\.vue|.ts|.js$/,
        loaders: {
          '.vue': 'js',
        },
      }),
      enforce: 'post',
    },
  ]
  // gzip压缩插件
  if (isBuild)
    vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
