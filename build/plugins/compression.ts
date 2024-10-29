import type { PluginOption } from 'vite'
import compression from 'vite-plugin-compression'

export function createCompression(env: ViteEnv) {
  const { VITE_BUILD_COMPRESS } = env
  const compressList = VITE_BUILD_COMPRESS?.split(',') ?? []
  const plugin: (PluginOption | PluginOption[])[] = []
  if (compressList.includes('gzip')) {
    plugin.push(
      compression({
        ext: '.gz',
        verbose: false,
        deleteOriginFile: false,
      }),
    )
  }
  if (compressList.includes('brotli')) {
    plugin.push(
      compression({
        ext: '.br',
        algorithm: 'brotliCompress',
        verbose: false,
        deleteOriginFile: false,
      }),
    )
  }
  return plugin
}
