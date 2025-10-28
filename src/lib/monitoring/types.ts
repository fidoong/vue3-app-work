/**
 * 监控模块类型定义
 */
import type { SeverityLevel } from '@sentry/vue'
import type { Metric } from 'web-vitals'

/**
 * 性能指标类型
 */
export type MetricName = 'CLS' | 'FCP' | 'LCP' | 'INP' | 'TTFB'

/**
 * 性能评级
 */
export type PerformanceRating = 'good' | 'needs-improvement' | 'poor'

/**
 * Web Vitals 指标
 */
export type WebVitalsMetric = Metric

/**
 * 错误上下文
 */
export interface ErrorContext {
  /** 错误来源 */
  source?: string
  /** 用户操作 */
  action?: string
  /** 额外数据 */
  extra?: Record<string, any>
  /** 标签 */
  tags?: Record<string, string>
}

/**
 * 性能追踪上下文
 */
export interface SpanContext {
  /** 追踪名称 */
  name: string
  /** 操作类型 */
  op: string
  /** 描述 */
  description?: string
  /** 标签 */
  tags?: Record<string, string>
  /** 数据 */
  data?: Record<string, any>
}

/**
 * 面包屑数据
 */
export interface BreadcrumbData {
  /** 消息 */
  message: string
  /** 分类 */
  category?: string
  /** 级别 */
  level?: SeverityLevel
  /** 数据 */
  data?: Record<string, any>
}

/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户 ID */
  id: string
  /** 用户名 */
  username?: string
  /** 邮箱 */
  email?: string
  /** IP 地址 */
  ip_address?: string
  /** 额外数据 */
  [key: string]: any
}

/**
 * 监控事件
 */
export interface MonitoringEvent {
  /** 事件类型 */
  type: 'error' | 'performance' | 'web-vitals' | 'custom'
  /** 事件名称 */
  name: string
  /** 时间戳 */
  timestamp: number
  /** 数据 */
  data?: Record<string, any>
}
