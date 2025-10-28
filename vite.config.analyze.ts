import type { PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import baseConfig from './vite.config'

/**
 * 构建分析配置
 * 使用方式: vite build --config vite.config.analyze.ts
 */
export default defineConfig(async (env) => {
  const config = typeof baseConfig === 'function' ? await baseConfig(env) : baseConfig

  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      // Bundle 分析插件
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        template: 'treemap', // 可选: treemap, sunburst, network
      }) as PluginOption,
    ],
  }
})
