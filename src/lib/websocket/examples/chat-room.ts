/**
 * 聊天室应用示例
 */
import type { WebSocketMessage } from '../types'
import { wsClient } from '../clients'

interface ChatMessage {
  userId: string
  username: string
  content: string
  timestamp: number
}

export class ChatRoom {
  private ws = wsClient

  connect() {
    this.ws.connect()

    this.ws.on('onOpen', () => {
      console.warn('聊天室已连接')
      this.ws.sendMessage('join', {
        roomId: 'room-001',
        userId: '123',
      })
    })

    this.ws.on('onMessage', (event: MessageEvent) => {
      const message: WebSocketMessage<ChatMessage> = JSON.parse(event.data)

      switch (message.type) {
        case 'chat':
          this.handleChatMessage(message.data)
          break
        case 'user-joined':
          this.handleUserJoined(message.data)
          break
        case 'user-left':
          this.handleUserLeft(message.data)
          break
      }
    })
  }

  sendMessage(content: string) {
    this.ws.sendMessage<ChatMessage>('chat', {
      userId: '123',
      username: 'User123',
      content,
      timestamp: Date.now(),
    })
  }

  private handleChatMessage(data: ChatMessage) {
    console.warn(`${data.username}: ${data.content}`)
  }

  private handleUserJoined(data: any) {
    console.warn(`${data.username} 加入了聊天室`)
  }

  private handleUserLeft(data: any) {
    console.warn(`${data.username} 离开了聊天室`)
  }

  disconnect() {
    this.ws.close()
  }
}
