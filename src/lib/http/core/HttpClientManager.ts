/**
 * HTTP 客户端管理器
 * 用于管理多个 HTTP 客户端实例
 */
import type { HttpClientConfig } from '../types/index'
import { HttpClient } from './HttpClient'

export class HttpClientManager {
  /** 客户端实例映射 */
  private static clients: Map<string, HttpClient> = new Map()

  /**
   * 创建或获取客户端实例
   */
  public static createClient(name: string, config: HttpClientConfig): HttpClient {
    if (this.clients.has(name)) {
      return this.clients.get(name)!
    }

    const client = new HttpClient(config)
    this.clients.set(name, client)
    return client
  }

  /**
   * 获取客户端实例
   */
  public static getClient(name: string): HttpClient | undefined {
    return this.clients.get(name)
  }

  /**
   * 移除客户端实例
   */
  public static removeClient(name: string): boolean {
    return this.clients.delete(name)
  }

  /**
   * 获取所有客户端实例
   */
  public static getAllClients(): Map<string, HttpClient> {
    return this.clients
  }

  /**
   * 清空所有客户端实例
   */
  public static clearAll(): void {
    this.clients.forEach((client) => {
      client.cancelAllRequests()
    })
    this.clients.clear()
  }

  /**
   * 取消所有客户端的待处理请求
   */
  public static cancelAllRequests(): void {
    this.clients.forEach((client) => {
      client.cancelAllRequests()
    })
  }
}
