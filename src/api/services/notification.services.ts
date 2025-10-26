/**
 * 通知消息服务
 */
import type { PageData, PageParams } from '../../lib/http/types'
import { apiClient } from '../../lib/http/clients'

/**
 * 通知类型
 */
export enum NotificationType {
  SYSTEM = 'system',
  MESSAGE = 'message',
  TODO = 'todo',
  ANNOUNCEMENT = 'announcement',
}

/**
 * 通知状态
 */
export enum NotificationStatus {
  UNREAD = 0,
  READ = 1,
}

/**
 * 通知消息
 */
export interface Notification {
  id: number | string
  type: NotificationType
  title: string
  content: string
  status: NotificationStatus
  createTime: string
  readTime?: string
  extra?: Record<string, any>
}

/**
 * 通知查询参数
 */
export interface NotificationQueryParams extends Partial<PageParams> {
  type?: NotificationType
  status?: NotificationStatus
  startTime?: string
  endTime?: string
}

/**
 * 通知统计
 */
export interface NotificationStats {
  total: number
  unread: number
  byType: Record<NotificationType, number>
}

/**
 * 通知服务类
 */
class NotificationService {
  /**
   * 获取通知列表
   */
  async getList(params?: NotificationQueryParams): Promise<PageData<Notification>> {
    const { data } = await apiClient.get<PageData<Notification>>('/notifications', params)
    return data
  }

  /**
   * 获取未读通知列表
   */
  async getUnreadList(params?: Partial<PageParams>): Promise<PageData<Notification>> {
    return this.getList({
      ...params,
      status: NotificationStatus.UNREAD,
    })
  }

  /**
   * 获取通知详情
   */
  async getById(id: number | string): Promise<Notification> {
    const { data } = await apiClient.get<Notification>(`/notifications/${id}`)
    return data
  }

  /**
   * 标记为已读
   */
  async markAsRead(id: number | string): Promise<void> {
    await apiClient.put(`/notifications/${id}/read`, {}, {
      showLoading: false,
    })
  }

  /**
   * 批量标记为已读
   */
  async batchMarkAsRead(ids: Array<number | string>): Promise<void> {
    await apiClient.post('/notifications/batch-read', { ids }, {
      showSuccess: true,
      successMessage: '已标记为已读',
    })
  }

  /**
   * 全部标记为已读
   */
  async markAllAsRead(): Promise<void> {
    await apiClient.post('/notifications/read-all', {}, {
      showSuccess: true,
      successMessage: '已全部标记为已读',
    })
  }

  /**
   * 删除通知
   */
  async delete(id: number | string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`, {}, {
      showSuccess: true,
      successMessage: '删除成功',
    })
  }

  /**
   * 批量删除
   */
  async batchDelete(ids: Array<number | string>): Promise<void> {
    await apiClient.post('/notifications/batch-delete', { ids }, {
      showSuccess: true,
      successMessage: '批量删除成功',
    })
  }

  /**
   * 清空已读通知
   */
  async clearRead(): Promise<void> {
    await apiClient.post('/notifications/clear-read', {}, {
      showSuccess: true,
      successMessage: '已清空已读通知',
    })
  }

  /**
   * 获取未读数量
   */
  async getUnreadCount(): Promise<number> {
    const { data } = await apiClient.get<{ count: number }>(
      '/notifications/unread-count',
      {},
      {
        showLoading: false,
      },
    )
    return data.count
  }

  /**
   * 获取通知统计
   */
  async getStats(): Promise<NotificationStats> {
    const { data } = await apiClient.get<NotificationStats>(
      '/notifications/stats',
      {},
      {
        showLoading: false,
      },
    )
    return data
  }

  /**
   * 订阅通知（WebSocket）
   */
  subscribeNotifications(callback: (notification: Notification) => void): () => void {
    // 这里可以实现 WebSocket 连接
    // 返回取消订阅的函数
    const ws = new WebSocket(`${this.getWsUrl()}/notifications`)

    ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data)
        callback(notification)
      }
      catch (error) {
        console.error('解析通知消息失败:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket 错误:', error)
    }

    // 返回取消订阅函数
    return () => {
      ws.close()
    }
  }

  /**
   * 获取 WebSocket URL
   */
  private getWsUrl(): string {
    const baseURL = apiClient.getAxiosInstance().defaults.baseURL || ''
    return baseURL.replace(/^http/, 'ws')
  }
}

/**
 * 导出单例
 */
export const notificationService = new NotificationService()
