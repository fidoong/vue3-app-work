/**
 * 主题管理 Composable
 */

import type { ThemeColors, ThemeConfig, ThemeMode } from '../types'
import { DEBOUNCE_DELAY, THEME_PRESETS } from '../constants'
import { applyDarkMode, applyThemeColors, loadThemeConfig, saveThemeConfig } from '../utils'

// 全局状态（单例模式）
const themeConfig = ref<ThemeConfig>({
  mode: 'light',
  preset: 'default',
  customColors: {},
})

let initialized = false
let debounceTimer: ReturnType<typeof setTimeout> | null = null

/**
 * 主题管理 Hook
 */
export function useTheme() {
  // 使用 VueUse 的 useDark
  const isDark = useDark({
    storageKey: 'app-theme-mode',
    valueDark: 'dark',
    valueLight: 'light',
  })

  // 当前激活的主题预设
  const currentPreset = computed(() => THEME_PRESETS[themeConfig.value.preset] || THEME_PRESETS.default)

  // 合并后的主题颜色
  const themeColors = computed(() => {
    const colors: ThemeColors = {
      ...currentPreset.value.colors,
    }
    // 只合并已定义的自定义颜色
    Object.entries(themeConfig.value.customColors).forEach(([key, value]) => {
      if (value !== undefined) {
        colors[key] = value
      }
    })
    return colors
  })

  /**
   * 应用主题到 DOM（带防抖优化）
   */
  function applyTheme() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    debounceTimer = setTimeout(() => {
      applyThemeColors(themeColors.value)
      applyDarkMode(isDark.value)
      debounceTimer = null
    }, DEBOUNCE_DELAY)
  }

  /**
   * 切换暗色模式
   */
  function toggleDark() {
    isDark.value = !isDark.value
    themeConfig.value.mode = isDark.value ? 'dark' : 'light'
    saveThemeConfig(themeConfig.value)
  }

  /**
   * 切换主题模式
   */
  function setThemeMode(mode: ThemeMode) {
    themeConfig.value.mode = mode

    if (mode === 'dark') {
      isDark.value = true
    }
    else if (mode === 'light') {
      isDark.value = false
    }
    else {
      // auto 模式
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
    }

    saveThemeConfig(themeConfig.value)
  }

  /**
   * 切换主题预设
   */
  function setThemePreset(preset: string) {
    if (THEME_PRESETS[preset]) {
      themeConfig.value.preset = preset
      saveThemeConfig(themeConfig.value)
      applyTheme()
    }
  }

  /**
   * 自定义主题颜色
   */
  function setCustomColor(key: string, value: string) {
    themeConfig.value.customColors[key] = value
    saveThemeConfig(themeConfig.value)
    applyTheme()
  }

  /**
   * 批量设置自定义颜色
   */
  function setCustomColors(colors: Record<string, string>) {
    themeConfig.value.customColors = { ...themeConfig.value.customColors, ...colors }
    saveThemeConfig(themeConfig.value)
    applyTheme()
  }

  /**
   * 重置主题配置
   */
  function resetTheme() {
    themeConfig.value = {
      mode: 'light',
      preset: 'default',
      customColors: {},
    }
    isDark.value = false
    saveThemeConfig(themeConfig.value)
    applyTheme()
  }

  /**
   * 获取所有可用的主题预设
   */
  function getThemePresets() {
    return Object.entries(THEME_PRESETS).map(([key, preset]) => ({
      key,
      ...preset,
    }))
  }

  // 初始化（只执行一次）
  if (!initialized) {
    initialized = true

    onMounted(() => {
      const saved = loadThemeConfig()
      if (saved) {
        themeConfig.value = { ...themeConfig.value, ...saved }
      }

      applyTheme()

      // 同步 isDark 到 themeConfig
      if (isDark.value) {
        themeConfig.value.mode = 'dark'
      }
    })

    // 监听暗色模式变化
    watch(isDark, () => {
      applyTheme()
    })

    // 监听主题颜色变化
    watch(themeColors, () => {
      applyTheme()
    }, { deep: true })
  }

  return {
    // 状态
    isDark,
    themeConfig: readonly(themeConfig),
    currentPreset,
    themeColors,

    // 方法
    toggleDark,
    setThemeMode,
    setThemePreset,
    setCustomColor,
    setCustomColors,
    resetTheme,
    getThemePresets,
    applyTheme,
  }
}
