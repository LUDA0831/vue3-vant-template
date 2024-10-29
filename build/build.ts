import type { BuildOptions } from 'vite'

export default function createViteBuild(): BuildOptions {
  return {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 2048,
    sourcemap: false,
    minify: 'esbuild',
  }
}
