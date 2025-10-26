/**
 * WebSocket 基础使用示例
 */
import { wsClient } from '../clients'

// ============================================
// 示例 1: 基础连接和消息收发
// ============================================

// 连接 WebSocket
wsClient.connect()

// 监听连接打开
wsClient.on('onOpen', (event: Event) => {
  console.warn('WebSocket 已连接', event)
})

// 监听消息
wsClient.on('onMessage', (event: MessageEvent) => {
  console.warn('收到消息:', event.data)

  try {
    const message = JSON.parse(event.data)
    console.warn('解析后的消息:', message)
  }
  catch (error) {
    console.error('消息解析失败:', error)
  }
})

// 监听错误
wsClient.on('onError', (event: Event) => {
  console.error('WebSocket 错误:', event)
})

// 监听关闭
wsClient.on('onClose', (event: CloseEvent) => {
  console.warn('WebSocket 已关闭:', event.code, event.reason)
})

// 监听重连失败
wsClient.on('onReconnectFailed', () => {
  console.error('WebSocket 重连失败')
})

// 发送文本消息
wsClient.send('Hello WebSocket')

// 发送 JSON 消息
wsClient.sendJSON({
  action: 'subscribe',
  channel: 'chat',
})

// 发送带类型的消息
wsClient.sendMessage('chat', {
  content: 'Hello',
  userId: '123',
})

// 关闭连接
// wsClient.close()

// ============================================
// 示例 2: 状态查询
// ============================================

// 检查连接状态
console.warn('是否已连接:', wsClient.isOpen())

// 获取连接状态码
console.warn('连接状态:', wsClient.getReadyState())
// 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED

// 获取重连次数
console.warn('重连次数:', wsClient.getReconnectCount())

// 获取消息队列大小
console.warn('队列大小:', wsClient.getQueueSize())

// 获取缓冲数据大小
console.warn('缓冲数据:', wsClient.getBufferedAmount())

// 清空消息队列
wsClient.clearQueue()
