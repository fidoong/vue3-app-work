/**
 * 主题预设配置
 */

import type { ThemePreset } from '../types'

export const THEME_PRESETS: Record<string, ThemePreset> = {
  default: {
    name: '默认主题',
    colors: {
      primary: '#1890ff',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#1890ff',
    },
  },
  purple: {
    name: '紫色主题',
    colors: {
      primary: '#722ed1',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#722ed1',
    },
  },
  green: {
    name: '绿色主题',
    colors: {
      primary: '#52c41a',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#52c41a',
    },
  },
  orange: {
    name: '橙色主题',
    colors: {
      primary: '#fa8c16',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#fa8c16',
    },
  },
  red: {
    name: '红色主题',
    colors: {
      primary: '#f5222d',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#f5222d',
    },
  },
}
