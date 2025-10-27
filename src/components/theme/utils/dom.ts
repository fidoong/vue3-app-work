/**
 * DOM 操作工具
 */

import type { ThemeColors } from '../types'

/**
 * 应用主题颜色到 DOM
 */
export function applyThemeColors(colors: ThemeColors): void {
  const root = document.documentElement

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-color-${key}`, value as string)
  })
}

/**
 * 应用暗色模式类
 */
export function applyDarkMode(isDark: boolean): void {
  const root = document.documentElement

  if (isDark) {
    root.classList.add('dark')
  }
  else {
    root.classList.remove('dark')
  }
}

/**
 * 检查是否为暗色模式
 */
export function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark')
}
