/**
 * 主题存储工具
 */

import type { ThemeConfig } from '../types'
import { STORAGE_KEY } from '../constants'

/**
 * 加载主题配置
 */
export function loadThemeConfig(): ThemeConfig | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  }
  catch (error) {
    console.warn('Failed to load theme config:', error)
  }
  return null
}

/**
 * 保存主题配置
 */
export function saveThemeConfig(config: ThemeConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }
  catch (error) {
    console.warn('Failed to save theme config:', error)
  }
}

/**
 * 清除主题配置
 */
export function clearThemeConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  }
  catch (error) {
    console.warn('Failed to clear theme config:', error)
  }
}
