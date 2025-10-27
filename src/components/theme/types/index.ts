/**
 * 主题系统类型定义
 */

/**
 * 主题模式
 */
export type ThemeMode = 'light' | 'dark' | 'auto'

/**
 * 主题颜色配置
 */
export interface ThemeColors {
  primary: string
  success: string
  warning: string
  error: string
  info: string
  [key: string]: string
}

/**
 * 主题预设
 */
export interface ThemePreset {
  name: string
  colors: ThemeColors
}

/**
 * 主题配置
 */
export interface ThemeConfig {
  mode: ThemeMode
  preset: string
  customColors: Partial<ThemeColors>
}

/**
 * 动画配置
 */
export interface MotionConfig {
  duration?: number
  easing?: string
  delay?: number
}

/**
 * 动画方向
 */
export type MotionDirection = 'up' | 'down' | 'left' | 'right'

/**
 * 动画预设
 */
export type MotionPreset = 'fade' | 'slide' | 'scale' | 'bounce'
