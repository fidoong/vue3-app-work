/**
 * 通用服务
 * 提供一些常用的公共接口
 */
import { apiClient } from '../../lib/http/clients'

/**
 * 地区数据
 */
export interface Region {
  code: string
  name: string
  level: number
  parentCode?: string
  children?: Region[]
}

/**
 * 验证码响应
 */
export interface CaptchaResponse {
  key: string
  image: string // base64
  expiresIn: number
}

/**
 * 系统配置
 */
export interface SystemConfig {
  siteName: string
  logo: string
  copyright: string
  icp?: string
  [key: string]: any
}

/**
 * 通用服务类
 */
class CommonService {
  /**
   * 获取验证码
   */
  async getCaptcha(): Promise<CaptchaResponse> {
    const { data } = await apiClient.get<CaptchaResponse>('/common/captcha', {}, {
      requireAuth: false,
      showLoading: false,
    })
    return data
  }

  /**
   * 验证验证码
   */
  async verifyCaptcha(key: string, code: string): Promise<boolean> {
    const { data } = await apiClient.post<boolean>('/common/captcha/verify', {
      key,
      code,
    }, {
      requireAuth: false,
      showError: false,
    })
    return data
  }

  /**
   * 发送短信验证码
   */
  async sendSmsCode(phone: string, type: 'login' | 'register' | 'reset'): Promise<void> {
    await apiClient.post('/common/sms/send', {
      phone,
      type,
    }, {
      showSuccess: true,
      successMessage: '验证码已发送',
    })
  }

  /**
   * 验证短信验证码
   */
  async verifySmsCode(phone: string, code: string): Promise<boolean> {
    const { data } = await apiClient.post<boolean>('/common/sms/verify', {
      phone,
      code,
    }, {
      showError: false,
    })
    return data
  }

  /**
   * 发送邮件验证码
   */
  async sendEmailCode(email: string, type: 'login' | 'register' | 'reset'): Promise<void> {
    await apiClient.post('/common/email/send', {
      email,
      type,
    }, {
      showSuccess: true,
      successMessage: '验证码已发送',
    })
  }

  /**
   * 获取省市区数据
   */
  async getRegions(parentCode?: string): Promise<Region[]> {
    const { data } = await apiClient.get<Region[]>('/common/regions', {
      parentCode,
    }, {
      useCache: true,
      cacheTTL: 24 * 60 * 60 * 1000, // 24小时
      showLoading: false,
    })
    return data
  }

  /**
   * 获取省份列表
   */
  async getProvinces(): Promise<Region[]> {
    return this.getRegions()
  }

  /**
   * 获取城市列表
   */
  async getCities(provinceCode: string): Promise<Region[]> {
    return this.getRegions(provinceCode)
  }

  /**
   * 获取区县列表
   */
  async getDistricts(cityCode: string): Promise<Region[]> {
    return this.getRegions(cityCode)
  }

  /**
   * 根据 IP 获取地理位置
   */
  async getLocationByIp(ip?: string): Promise<{ country: string, province: string, city: string }> {
    const { data } = await apiClient.get<{ country: string, province: string, city: string }>(
      '/common/location',
      { ip },
      {
        requireAuth: false,
        showLoading: false,
      },
    )
    return data
  }

  /**
   * 获取系统配置
   */
  async getSystemConfig(): Promise<SystemConfig> {
    const { data } = await apiClient.get<SystemConfig>('/common/config', {}, {
      requireAuth: false,
      useCache: true,
      cacheTTL: 10 * 60 * 1000, // 10分钟
    })
    return data
  }

  /**
   * 获取 OSS 上传凭证
   */
  async getOssToken(): Promise<{
    accessKeyId: string
    accessKeySecret: string
    securityToken: string
    bucket: string
    region: string
    expiration: string
  }> {
    const { data } = await apiClient.get('/common/oss/token')
    return data
  }

  /**
   * 获取七牛云上传 Token
   */
  async getQiniuToken(): Promise<{ token: string, domain: string }> {
    const { data } = await apiClient.get('/common/qiniu/token')
    return data
  }

  /**
   * 文件预览 URL
   */
  getPreviewUrl(fileKey: string): string {
    return `${apiClient.getAxiosInstance().defaults.baseURL}/common/preview?key=${fileKey}`
  }

  /**
   * 文件下载 URL
   */
  getDownloadUrl(fileKey: string, filename?: string): string {
    const params = new URLSearchParams({ key: fileKey })
    if (filename) {
      params.append('filename', filename)
    }
    return `${apiClient.getAxiosInstance().defaults.baseURL}/common/download?${params}`
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<{ status: string, timestamp: number }> {
    const { data } = await apiClient.get<{ status: string, timestamp: number }>(
      '/health',
      {},
      {
        requireAuth: false,
        showLoading: false,
        showError: false,
      },
    )
    return data
  }

  /**
   * 获取服务器时间
   */
  async getServerTime(): Promise<number> {
    const { data } = await apiClient.get<{ timestamp: number }>(
      '/common/time',
      {},
      {
        requireAuth: false,
        showLoading: false,
      },
    )
    return data.timestamp
  }
}

/**
 * 导出单例
 */
export const commonService = new CommonService()
