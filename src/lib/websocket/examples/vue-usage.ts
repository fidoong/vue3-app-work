/**
 * Vue 组件中使用 WebSocket 示例
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { wsClient } from '../clients'

/**
 * useWebSocket Composable
 */
export function useWebSocket() {
  const isConnected = ref(false)
  const messages = ref<any[]>([])

  onMounted(() => {
    wsClient.connect()

    wsClient.on('onOpen', () => {
      isConnected.value = true
    })

    wsClient.on('onClose', () => {
      isConnected.value = false
    })

    wsClient.on('onMessage', (event: MessageEvent) => {
      const message = JSON.parse(event.data)
      messages.value.push(message)
    })
  })

  onUnmounted(() => {
    wsClient.close()
  })

  function send(data: any) {
    wsClient.sendJSON(data)
  }

  function sendMessage(type: string, data: any) {
    wsClient.sendMessage(type, data)
  }

  return {
    isConnected,
    messages,
    send,
    sendMessage,
  }
}

/**
 * 在组件中使用示例
 *
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useWebSocket } from '@/websocket/examples/vue-usage'
 *
 * const { isConnected, messages, sendMessage } = useWebSocket()
 * const inputMessage = ref('')
 *
 * function handleSend() {
 *   if (inputMessage.value.trim()) {
 *     sendMessage('chat', {
 *       content: inputMessage.value,
 *       timestamp: Date.now(),
 *     })
 *     inputMessage.value = ''
 *   }
 * }
 * </script>
 *
 * <template>
 *   <div class="chat-container">
 *     <div class="status">
 *       连接状态: {{ isConnected ? '已连接' : '未连接' }}
 *     </div>
 *     <div class="messages">
 *       <div v-for="(msg, index) in messages" :key="index">
 *         {{ msg.content }}
 *       </div>
 *     </div>
 *     <div class="input-area">
 *       <input v-model="inputMessage" @keyup.enter="handleSend">
 *       <button @click="handleSend">发送</button>
 *     </div>
 *   </div>
 * </template>
 */
