/**
 * WebSocket 核心类型定义
 */

/**
 * WebSocket 配置
 */
export interface WebSocketConfig {
  /** WebSocket 服务地址 */
  url: string
  /** 子协议 */
  protocols?: string | string[]
  /** 是否自动重连 */
  reconnect?: boolean
  /** 重连间隔(ms) */
  reconnectInterval?: number
  /** 最大重连次数 */
  reconnectMaxAttempts?: number
  /** 是否启用心跳 */
  heartbeat?: boolean
  /** 心跳间隔(ms) */
  heartbeatInterval?: number
  /** 心跳超时时间(ms) */
  heartbeatTimeout?: number
  /** 心跳消息内容 */
  heartbeatMessage?: string
  /** 是否自动连接 */
  autoConnect?: boolean
  /** 消息队列大小 */
  messageQueueSize?: number
  /** 二进制数据类型 */
  binaryType?: BinaryType
  /** 获取 Token 的方法 */
  getToken?: () => string | null
  /** Token 过期处理 */
  onTokenExpired?: () => void
}

/**
 * WebSocket 消息结构
 */
export interface WebSocketMessage<T = any> {
  /** 消息类型 */
  type: string
  /** 消息数据 */
  data: T
  /** 时间戳 */
  timestamp: number
  /** 消息ID */
  id?: string
}

/**
 * WebSocket 事件处理器
 */
export interface WebSocketEventHandlers {
  /** 连接打开 */
  onOpen?: (event: Event) => void
  /** 收到消息 */
  onMessage?: (event: MessageEvent) => void
  /** 连接错误 */
  onError?: (event: Event) => void
  /** 连接关闭 */
  onClose?: (event: CloseEvent) => void
  /** 重连失败 */
  onReconnectFailed?: () => void
}
