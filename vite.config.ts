import path from 'node:path'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import 'vitest/config'

export default defineConfig(({ command, mode }) => ({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  // 构建优化
  build: {
    // 目标浏览器
    target: 'es2015',
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 代码分割
    rollupOptions: {
      output: {
        // 智能代码分割策略
        manualChunks: (id) => {
          // node_modules 依赖分割
          if (id.includes('node_modules')) {
            // Vue 核心生态
            if (id.includes('vue') || id.includes('pinia') || id.includes('@vue')) {
              if (id.includes('vue-router'))
                return 'vue-router'
              if (id.includes('vue-i18n'))
                return 'vue-i18n'
              if (id.includes('pinia'))
                return 'pinia'
              if (id.includes('@vueuse'))
                return 'vueuse'
              return 'vue-core'
            }

            // Ant Design Vue 按需分割
            if (id.includes('ant-design-vue')) {
              // 数据展示组件 (较大)
              if (id.includes('/table/') || id.includes('/tree/') || id.includes('/calendar/')) {
                return 'antd-data'
              }
              // 表单组件
              if (id.includes('/form/') || id.includes('/input/') || id.includes('/select/')) {
                return 'antd-form'
              }
              // 反馈组件
              if (id.includes('/modal/') || id.includes('/message/') || id.includes('/notification/')) {
                return 'antd-feedback'
              }
              // 其他基础组件
              return 'antd-base'
            }

            // HTTP 和数据请求
            if (id.includes('axios'))
              return 'axios'
            if (id.includes('@tanstack/vue-query'))
              return 'vue-query'

            // 监控和性能
            if (id.includes('@sentry'))
              return 'sentry'
            if (id.includes('web-vitals'))
              return 'web-vitals'

            // 动画库
            if (id.includes('motion'))
              return 'motion'

            // 图标
            if (id.includes('@iconify'))
              return 'iconify'

            // 其他第三方库
            return 'vendor'
          }

          // 项目代码分割
          // 核心库模块
          if (id.includes('/src/lib/')) {
            if (id.includes('/lib/http/'))
              return 'lib-http'
            if (id.includes('/lib/websocket/'))
              return 'lib-websocket'
            if (id.includes('/lib/monitoring/'))
              return 'lib-monitoring'
            if (id.includes('/lib/error/'))
              return 'lib-error'
            return 'lib-core'
          }

          // 组件库
          if (id.includes('/src/components/')) {
            if (id.includes('/business/'))
              return 'components-business'
            if (id.includes('/base/'))
              return 'components-base'
            return 'components-shared'
          }

          // 工具函数
          if (id.includes('/src/utils/'))
            return 'utils'

          // 类型定义 (通常很小，可以内联)
          if (id.includes('/src/types/'))
            return undefined

          // API 服务
          if (id.includes('/src/api/'))
            return 'api-services'

          // 页面按路由分割
          if (id.includes('/src/pages/')) {
            if (id.includes('/demos/'))
              return 'pages-demos'
            return 'pages-main'
          }
        },
        // 输出文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // 根据资源类型分类
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[ext]/[name]-[hash][extname]`
        },
      },
    },
    // 提高警告阈值
    chunkSizeWarningLimit: 1000,
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        // 移除未使用的代码
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
      },
      format: {
        // 移除注释
        comments: false,
      },
    },
    // 启用源码映射 (生产环境可选)
    sourcemap: mode !== 'production',
  },

  // 优化依赖预构建
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      '@tanstack/vue-query',
      'ant-design-vue',
      '@vueuse/core',
      'nprogress',
    ],
    // 排除不需要预构建的依赖
    exclude: [
      'vue-demi',
    ],
  },

  // 服务器配置
  server: {
    // 预热常用文件
    warmup: {
      clientFiles: [
        './src/main.ts',
        './src/App.vue',
        './src/pages/index.vue',
        './src/lib/http/index.ts',
        './src/components/index.ts',
      ],
    },
  },

  plugins: [
    // https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      mockPath: 'mock',
      enable: command === 'serve',
      logger: true,
      watchFiles: true,
    }),
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
      dts: 'src/typed-router.d.ts',
    }),

    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/],
        }),
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },
}))
