/**
 * 拦截器管理器
 * 用于动态添加、移除拦截器
 */
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export type RequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>

export type RequestErrorInterceptor = (error: any) => any

export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>

export type ResponseErrorInterceptor = (error: any) => any

export interface InterceptorItem {
  id: number
  name: string
  type: 'request' | 'response'
}

/**
 * 拦截器管理器类
 */
export class InterceptorManager {
  private instance: AxiosInstance
  private interceptors: Map<string, InterceptorItem> = new Map()

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  /**
   * 添加请求拦截器
   */
  addRequestInterceptor(
    name: string,
    onFulfilled?: RequestInterceptor,
    onRejected?: RequestErrorInterceptor,
  ): void {
    if (this.interceptors.has(name)) {
      console.warn(`Interceptor "${name}" already exists`)
      return
    }

    const id = this.instance.interceptors.request.use(onFulfilled, onRejected)
    this.interceptors.set(name, { id, name, type: 'request' })
  }

  /**
   * 添加响应拦截器
   */
  addResponseInterceptor(
    name: string,
    onFulfilled?: ResponseInterceptor,
    onRejected?: ResponseErrorInterceptor,
  ): void {
    if (this.interceptors.has(name)) {
      console.warn(`Interceptor "${name}" already exists`)
      return
    }

    const id = this.instance.interceptors.response.use(onFulfilled, onRejected)
    this.interceptors.set(name, { id, name, type: 'response' })
  }

  /**
   * 移除拦截器
   */
  removeInterceptor(name: string): boolean {
    const interceptor = this.interceptors.get(name)
    if (!interceptor) {
      return false
    }

    if (interceptor.type === 'request') {
      this.instance.interceptors.request.eject(interceptor.id)
    }
    else {
      this.instance.interceptors.response.eject(interceptor.id)
    }

    return this.interceptors.delete(name)
  }

  /**
   * 获取所有拦截器
   */
  getAllInterceptors(): InterceptorItem[] {
    return Array.from(this.interceptors.values())
  }

  /**
   * 清空所有拦截器
   */
  clearAll(): void {
    this.interceptors.forEach((interceptor) => {
      if (interceptor.type === 'request') {
        this.instance.interceptors.request.eject(interceptor.id)
      }
      else {
        this.instance.interceptors.response.eject(interceptor.id)
      }
    })
    this.interceptors.clear()
  }

  /**
   * 检查拦截器是否存在
   */
  hasInterceptor(name: string): boolean {
    return this.interceptors.has(name)
  }
}
