/**
 * WebSocket 管理器
 * 支持多实例管理
 */
import type { WebSocketConfig } from '../types'
import { WebSocketClient } from './WebSocketClient'

export class WebSocketManager {
  private static clients: Map<string, WebSocketClient> = new Map()

  public static createClient(name: string, config: WebSocketConfig): WebSocketClient {
    if (this.clients.has(name)) {
      console.warn(`[WebSocketManager] 客户端 "${name}" 已存在，将返回现有实例`)
      return this.clients.get(name)!
    }

    const client = new WebSocketClient(config)
    this.clients.set(name, client)

    return client
  }

  public static getClient(name: string): WebSocketClient | undefined {
    return this.clients.get(name)
  }

  public static removeClient(name: string): boolean {
    const client = this.clients.get(name)
    if (client) {
      client.close()
      this.clients.delete(name)
      return true
    }
    return false
  }

  public static getClientNames(): string[] {
    return Array.from(this.clients.keys())
  }

  public static closeAll(): void {
    this.clients.forEach((client) => {
      client.close()
    })
    this.clients.clear()
  }

  public static getClientCount(): number {
    return this.clients.size
  }
}
