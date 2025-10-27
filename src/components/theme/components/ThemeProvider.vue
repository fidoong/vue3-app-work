<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useTheme } from '../composables'

const { isDark, themeColors } = useTheme()

// Ant Design Vue 主题配置
const antdTheme = computed(() => ({
  algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    // 主题颜色
    colorPrimary: themeColors.value.primary,
    colorSuccess: themeColors.value.success,
    colorWarning: themeColors.value.warning,
    colorError: themeColors.value.error,
    colorInfo: themeColors.value.info,

    // 基础配置
    borderRadius: 6,
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

    // 暗色模式专用配置
    ...(isDark.value
      ? {
          // 背景色
          colorBgBase: '#141414',
          colorBgContainer: '#1f1f1f',
          colorBgElevated: '#2a2a2a',
          colorBgLayout: '#0a0a0a',
          colorBgSpotlight: 'rgba(255, 255, 255, 0.08)',

          // 文字颜色
          colorText: 'rgba(255, 255, 255, 0.85)',
          colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
          colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
          colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',

          // 边框颜色
          colorBorder: '#434343',
          colorBorderSecondary: '#303030',

          // 填充色
          colorFill: 'rgba(255, 255, 255, 0.08)',
          colorFillSecondary: 'rgba(255, 255, 255, 0.06)',
          colorFillTertiary: 'rgba(255, 255, 255, 0.04)',
          colorFillQuaternary: 'rgba(255, 255, 255, 0.02)',
        }
      : {}),
  },
}))
</script>

<template>
  <ConfigProvider
    :theme="antdTheme"
    :locale="zhCN"
  >
    <slot />
  </ConfigProvider>
</template>
