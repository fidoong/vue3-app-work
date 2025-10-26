# WebSocket 模块

独立的 WebSocket 客户端模块，支持自动重连、心跳检测、消息队列等功能。

## 📁 目录结构

```
src/websocket/
├── core/                    # 核心模块
│   ├── WebSocketClient.ts   # WebSocket 客户端类
│   ├── WebSocketManager.ts  # 客户端管理器
│   ├── types.ts            # 类型定义
│   └── index.ts            # 导出
├── clients/                # 客户端实例
│   └── index.ts            # 预配置的客户端实例
├── examples/               # 使用示例
│   ├── basic-usage.ts      # 基础用法
│   ├── chat-room.ts        # 聊天室示例
│   └── vue-usage.ts        # Vue 组件使用
├── index.ts                # 模块入口
└── README.md               # 文档
```

## 🚀 快速开始

### 1. 基础使用

```typescript
import { wsClient } from '@/websocket/clients'

// 连接 WebSocket
wsClient.connect()

// 监听消息
wsClient.on('onMessage', (event) => {
  console.log('收到消息:', event.data)
})

// 发送消息
wsClient.send('Hello')
wsClient.sendJSON({ type: 'chat', content: 'Hello' })
wsClient.sendMessage('chat', { content: 'Hello' })
```

### 2. 在 Vue 组件中使用

```vue
<script setup lang="ts">
import { useWebSocket } from '@/websocket/examples/vue-usage'

const { isConnected, messages, sendMessage } = useWebSocket()

function handleSend() {
  sendMessage('chat', { content: 'Hello' })
}
</script>

<template>
  <div>
    <div>状态: {{ isConnected ? '已连接' : '未连接' }}</div>
    <div v-for="msg in messages" :key="msg.id">
      {{ msg.content }}
    </div>
    <button @click="handleSend">发送</button>
  </div>
</template>
```

## ⚙️ 配置说明

### WebSocketConfig

```typescript
interface WebSocketConfig {
  url: string                    // WebSocket 服务地址
  protocols?: string | string[]  // 子协议
  reconnect?: boolean            // 是否自动重连 (默认: true)
  reconnectInterval?: number     // 重连间隔 (默认: 3000ms)
  reconnectMaxAttempts?: number  // 最大重连次数 (默认: 5)
  heartbeat?: boolean            // 是否启用心跳 (默认: true)
  heartbeatInterval?: number     // 心跳间隔 (默认: 30000ms)
  heartbeatTimeout?: number      // 心跳超时 (默认: 5000ms)
  heartbeatMessage?: string      // 心跳消息 (默认: 'ping')
  autoConnect?: boolean          // 是否自动连接 (默认: true)
  messageQueueSize?: number      // 消息队列大小 (默认: 100)
  binaryType?: BinaryType        // 二进制类型 (默认: 'blob')
  getToken?: () => string | null // 获取 Token
  onTokenExpired?: () => void    // Token 过期处理
}
```

## 📖 API 文档

### WebSocketClient

#### 连接管理

```typescript
// 连接
wsClient.connect()

// 关闭连接
wsClient.close(code?: number, reason?: string)

// 检查是否已连接
wsClient.isOpen() // boolean

// 获取连接状态
wsClient.getReadyState() // 0-3
```

#### 消息发送

```typescript
// 发送文本/二进制消息
wsClient.send(data: string | ArrayBufferLike | Blob | ArrayBufferView)

// 发送 JSON 消息
wsClient.sendJSON({ type: 'chat', content: 'Hello' })

// 发送带类型的消息
wsClient.sendMessage('chat', { content: 'Hello' })
```

#### 事件监听

```typescript
// 监听事件
wsClient.on('onOpen', (event) => {})
wsClient.on('onMessage', (event) => {})
wsClient.on('onError', (event) => {})
wsClient.on('onClose', (event) => {})
wsClient.on('onReconnectFailed', () => {})

// 移除事件监听
wsClient.off('onMessage')
```

#### 状态查询

```typescript
// 获取重连次数
wsClient.getReconnectCount()

// 获取消息队列大小
wsClient.getQueueSize()

// 获取缓冲数据大小
wsClient.getBufferedAmount()

// 清空消息队列
wsClient.clearQueue()
```

### WebSocketManager

```typescript
import { WebSocketManager } from '@/websocket'

// 创建客户端
const ws = WebSocketManager.createClient('custom', {
  url: 'ws://localhost:3000/ws',
  reconnect: true,
})

// 获取客户端
const client = WebSocketManager.getClient('custom')

// 移除客户端
WebSocketManager.removeClient('custom')

// 获取所有客户端名称
WebSocketManager.getClientNames()

// 关闭所有客户端
WebSocketManager.closeAll()

// 获取客户端数量
WebSocketManager.getClientCount()
```

## 🎯 使用场景

### 1. 聊天应用

```typescript
import { ChatRoom } from '@/websocket/examples/chat-room'

const chatRoom = new ChatRoom()
chatRoom.connect()
chatRoom.sendMessage('Hello everyone!')
```

### 2. 实时通知

```typescript
import { notificationWs } from '@/websocket/clients'

notificationWs.connect()

notificationWs.on('onMessage', (event) => {
  const notification = JSON.parse(event.data)
  // 显示通知
})
```

### 3. 实时数据推送

```typescript
wsClient.connect()

wsClient.on('onMessage', (event) => {
  const data = JSON.parse(event.data)

  switch (data.type) {
    case 'price-update':
      updatePrice(data.data)
      break
    case 'order-status':
      updateOrderStatus(data.data)
      break
  }
})
```

## 🔧 环境配置

在 `.env` 文件中配置 WebSocket 地址：

```bash
# .env.development
VITE_WS_URL=ws://localhost:3000/ws
VITE_WS_NOTIFICATION_URL=ws://localhost:3000/ws/notification

# .env.production
VITE_WS_URL=wss://api.example.com/ws
VITE_WS_NOTIFICATION_URL=wss://api.example.com/ws/notification
```

## ✨ 特性

- ✅ 自动重连机制
- ✅ 心跳检测
- ✅ 消息队列（连接前的消息缓存）
- ✅ Token 认证
- ✅ 多实例管理
- ✅ TypeScript 类型支持
- ✅ 事件驱动
- ✅ Vue Composable 支持

## 📝 注意事项

1. **连接时机**: 建议在需要时手动调用 `connect()`，而不是自动连接
2. **资源清理**: 组件卸载时记得调用 `close()` 关闭连接
3. **消息格式**: 建议使用统一的消息格式（type + data）
4. **错误处理**: 务必监听 `onError` 和 `onClose` 事件
5. **Token 刷新**: Token 过期时会触发 `onTokenExpired` 回调

## 🐛 常见问题

### 1. 连接失败

- 检查 WebSocket 服务地址是否正确
- 检查网络连接
- 查看浏览器控制台错误信息

### 2. 消息发送失败

- 检查连接状态 `wsClient.isOpen()`
- 未连接时消息会自动加入队列
- 检查消息队列是否已满

### 3. 频繁重连

- 检查心跳配置是否合理
- 检查服务端是否正常
- 适当增加重连间隔

## 📚 更多示例

查看 `examples/` 目录下的完整示例：

- `basic-usage.ts` - 基础用法
- `chat-room.ts` - 聊天室应用
- `vue-usage.ts` - Vue 组件集成
