# WebSocket 快速开始

## 5 分钟上手

### 1. 配置环境变量

```bash
# .env.development
VITE_WS_URL=ws://localhost:3000/ws
```

### 2. 基础使用

```typescript
import { wsClient } from '@/websocket/clients'

// 连接
wsClient.connect()

// 监听消息
wsClient.on('onMessage', (event: MessageEvent) => {
  const data = JSON.parse(event.data)
  console.log('收到消息:', data)
})

// 发送消息
wsClient.sendMessage('chat', {
  content: 'Hello World'
})
```

### 3. 在 Vue 组件中使用

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { wsClient } from '@/websocket/clients'

onMounted(() => {
  wsClient.connect()

  wsClient.on('onMessage', (event: MessageEvent) => {
    console.log('收到消息:', event.data)
  })
})

onUnmounted(() => {
  wsClient.close()
})

function sendMessage() {
  wsClient.sendMessage('chat', { content: 'Hello' })
}
</script>
```

### 4. 使用 Composable（推荐）

```typescript
// 使用封装好的 composable
import { useWebSocket } from '@/websocket/examples/vue-usage'

const { isConnected, messages, sendMessage } = useWebSocket()

// 发送消息
sendMessage('chat', { content: 'Hello' })
```

## 常用 API

```typescript
// 连接管理
wsClient.connect()
wsClient.close()
wsClient.isOpen()

// 发送消息
wsClient.send('text')
wsClient.sendJSON({ key: 'value' })
wsClient.sendMessage('type', { data: 'value' })

// 事件监听
wsClient.on('onOpen', (event: Event) => {})
wsClient.on('onMessage', (event: MessageEvent) => {})
wsClient.on('onClose', (event: CloseEvent) => {})
wsClient.on('onError', (event: Event) => {})
```

## 下一步

- 查看 [README.md](./README.md) 了解完整功能
- 查看 [examples/](./examples/) 目录学习更多示例
