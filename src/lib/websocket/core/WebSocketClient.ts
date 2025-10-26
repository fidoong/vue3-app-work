/**
 * WebSocket 客户端类
 * 支持自动重连、心跳检测、消息队列等功能
 */
import type { WebSocketConfig, WebSocketEventHandlers, WebSocketMessage } from '../types'

export class WebSocketClient {
  private ws: WebSocket | null = null
  private config: Required<WebSocketConfig>
  private isConnected: boolean = false
  private isManualClose: boolean = false
  private reconnectTimer: number | null = null
  private heartbeatTimer: number | null = null
  private heartbeatTimeoutTimer: number | null = null
  private reconnectCount: number = 0
  private messageQueue: Array<string | ArrayBufferLike | Blob | ArrayBufferView> = []
  private eventHandlers: WebSocketEventHandlers = {}

  constructor(config: WebSocketConfig) {
    this.config = {
      url: config.url,
      protocols: config.protocols ?? [],
      reconnect: config.reconnect ?? true,
      reconnectInterval: config.reconnectInterval ?? 3000,
      reconnectMaxAttempts: config.reconnectMaxAttempts ?? 5,
      heartbeat: config.heartbeat ?? true,
      heartbeatInterval: config.heartbeatInterval ?? 30000,
      heartbeatTimeout: config.heartbeatTimeout ?? 5000,
      heartbeatMessage: config.heartbeatMessage ?? 'ping',
      autoConnect: config.autoConnect ?? true,
      messageQueueSize: config.messageQueueSize ?? 100,
      binaryType: config.binaryType ?? 'blob',
      getToken: config.getToken ?? (() => null),
      onTokenExpired: config.onTokenExpired ?? (() => {}),
    }

    if (this.config.autoConnect) {
      this.connect()
    }
  }

  public connect(): void {
    if (this.ws && this.isConnected) {
      console.warn('[WebSocket] 已经连接，无需重复连接')
      return
    }

    this.isManualClose = false

    try {
      const url = this.buildUrl()
      this.ws = new WebSocket(url, this.config.protocols)
      this.ws.binaryType = this.config.binaryType
      this.setupEventListeners()
    }
    catch (error) {
      console.error('[WebSocket] 连接失败:', error)
      this.handleReconnect()
    }
  }

  private buildUrl(): string {
    const url = new URL(this.config.url)
    if (this.config.getToken) {
      const token = this.config.getToken()
      if (token) {
        url.searchParams.set('token', token)
      }
    }
    return url.toString()
  }

  private setupEventListeners(): void {
    if (!this.ws)
      return

    this.ws.onopen = (event) => {
      this.isConnected = true
      this.reconnectCount = 0
      this.flushMessageQueue()
      if (this.config.heartbeat) {
        this.startHeartbeat()
      }
      this.eventHandlers.onOpen?.(event)
    }

    this.ws.onmessage = (event) => {
      if (this.isHeartbeatResponse(event.data)) {
        this.handleHeartbeatResponse()
        return
      }
      this.eventHandlers.onMessage?.(event)
    }

    this.ws.onerror = (event) => {
      console.error('[WebSocket] 连接错误:', event)
      this.eventHandlers.onError?.(event)
    }

    this.ws.onclose = (event) => {
      this.isConnected = false
      this.stopHeartbeat()

      if (event.code === 4001 || event.code === 4003) {
        console.warn('[WebSocket] Token 已过期')
        this.config.onTokenExpired()
        this.eventHandlers.onClose?.(event)
        return
      }

      this.eventHandlers.onClose?.(event)

      if (!this.isManualClose && this.config.reconnect) {
        this.handleReconnect()
      }
    }
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (!this.ws || !this.isConnected) {
      console.warn('[WebSocket] 未连接，消息已加入队列')
      this.addToQueue(data)
      return
    }

    try {
      this.ws.send(data)
    }
    catch (error) {
      console.error('[WebSocket] 发送消息失败:', error)
      this.addToQueue(data)
    }
  }

  public sendJSON<T = any>(data: T): void {
    this.send(JSON.stringify(data))
  }

  public sendMessage<T = any>(type: string, data: T): void {
    const message: WebSocketMessage<T> = {
      type,
      data,
      timestamp: Date.now(),
    }
    this.sendJSON(message)
  }

  private addToQueue(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.messageQueue.length >= this.config.messageQueueSize) {
      console.warn('[WebSocket] 消息队列已满，丢弃最早的消息')
      this.messageQueue.shift()
    }
    this.messageQueue.push(data)
  }

  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const data = this.messageQueue.shift()
      if (data) {
        this.send(data)
      }
    }
  }

  private startHeartbeat(): void {
    this.stopHeartbeat()
    this.heartbeatTimer = window.setInterval(() => {
      if (this.isConnected) {
        this.send(this.config.heartbeatMessage)
        this.heartbeatTimeoutTimer = window.setTimeout(() => {
          console.warn('[WebSocket] 心跳超时，尝试重连')
          this.close()
          this.handleReconnect()
        }, this.config.heartbeatTimeout)
      }
    }, this.config.heartbeatInterval)
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer)
      this.heartbeatTimeoutTimer = null
    }
  }

  private isHeartbeatResponse(data: any): boolean {
    if (typeof data === 'string') {
      return data === 'pong' || data === this.config.heartbeatMessage
    }
    return false
  }

  private handleHeartbeatResponse(): void {
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer)
      this.heartbeatTimeoutTimer = null
    }
  }

  private handleReconnect(): void {
    if (this.reconnectTimer) {
      return
    }

    if (this.reconnectCount >= this.config.reconnectMaxAttempts) {
      console.error('[WebSocket] 重连次数已达上限')
      this.eventHandlers.onReconnectFailed?.()
      return
    }

    this.reconnectCount++

    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null
      this.connect()
    }, this.config.reconnectInterval)
  }

  public close(code?: number, reason?: string): void {
    this.isManualClose = true
    this.stopHeartbeat()

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    if (this.ws) {
      this.ws.close(code, reason)
      this.ws = null
    }

    this.isConnected = false
    this.messageQueue = []
  }

  public on<K extends keyof WebSocketEventHandlers>(
    event: K,
    handler: WebSocketEventHandlers[K],
  ): void {
    this.eventHandlers[event] = handler
  }

  public off<K extends keyof WebSocketEventHandlers>(event: K): void {
    delete this.eventHandlers[event]
  }

  public getReadyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED
  }

  public isOpen(): boolean {
    return this.isConnected && this.ws?.readyState === WebSocket.OPEN
  }

  public getBufferedAmount(): number {
    return this.ws?.bufferedAmount ?? 0
  }

  public getReconnectCount(): number {
    return this.reconnectCount
  }

  public getQueueSize(): number {
    return this.messageQueue.length
  }

  public clearQueue(): void {
    this.messageQueue = []
  }
}
