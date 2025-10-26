/**
 * WebSocket 客户端实例配置
 */
import { WebSocketManager } from '../core'

/**
 * 主 WebSocket 客户端
 * 用于实时通信、消息推送等
 */
export const wsClient = WebSocketManager.createClient('main', {
  url: import.meta.env.VITE_WS_URL || 'ws://localhost:3000/ws',
  reconnect: true,
  reconnectInterval: 3000,
  reconnectMaxAttempts: 5,
  heartbeat: true,
  heartbeatInterval: 30000,
  heartbeatTimeout: 5000,
  heartbeatMessage: 'ping',
  autoConnect: false,
  messageQueueSize: 100,
  binaryType: 'blob',
  getToken: () => {
    return localStorage.getItem('token')
  },
  onTokenExpired: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    window.location.href = '/login?expired=1'
  },
})

/**
 * 通知 WebSocket 客户端
 */
export const notificationWs = WebSocketManager.createClient('notification', {
  url: import.meta.env.VITE_WS_NOTIFICATION_URL || 'ws://localhost:3000/ws/notification',
  reconnect: true,
  reconnectInterval: 5000,
  reconnectMaxAttempts: 10,
  heartbeat: true,
  autoConnect: false,
  getToken: () => localStorage.getItem('token'),
})

export { WebSocketManager }
