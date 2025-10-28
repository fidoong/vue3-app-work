/**
 * 性能监控类型定义
 */

export interface PerformanceMetric {
  /** 指标名称 */
  name: string
  /** 指标值 */
  value: number
  /** 单位 */
  unit: 'ms' | 'bytes' | 'count'
  /** 时间戳 */
  timestamp: number
  /** 额外信息 */
  meta?: Record<string, any>
}

export interface PageLoadMetrics {
  /** DNS 查询时间 */
  dns: number
  /** TCP 连接时间 */
  tcp: number
  /** 请求时间 */
  request: number
  /** 响应时间 */
  response: number
  /** DOM 解析时间 */
  domParse: number
  /** 资源加载时间 */
  resourceLoad: number
  /** 首次渲染时间 */
  firstPaint: number
  /** 首次内容渲染时间 */
  firstContentfulPaint: number
  /** 最大内容渲染时间 */
  largestContentfulPaint: number
  /** 首次输入延迟 */
  firstInputDelay: number
  /** 累积布局偏移 */
  cumulativeLayoutShift: number
  /** 总加载时间 */
  loadComplete: number
}

export interface ApiMetrics {
  /** 请求 URL */
  url: string
  /** 请求方法 */
  method: string
  /** 请求耗时 */
  duration: number
  /** 响应状态码 */
  status: number
  /** 响应大小 */
  size?: number
  /** 是否成功 */
  success: boolean
  /** 时间戳 */
  timestamp: number
}

export interface ComponentMetrics {
  /** 组件名称 */
  name: string
  /** 渲染耗时 */
  renderTime: number
  /** 更新次数 */
  updateCount: number
  /** 时间戳 */
  timestamp: number
}

export interface ResourceMetrics {
  /** 资源名称 */
  name: string
  /** 资源类型 */
  type: string
  /** 资源大小 */
  size: number
  /** 加载耗时 */
  duration: number
  /** 时间戳 */
  timestamp: number
}

export type MetricHandler = (metric: PerformanceMetric) => void
