/**
 * 文件上传服务
 */
import { apiClient } from '../../lib/http/clients'

/**
 * 上传响应
 */
export interface UploadResponse {
  url: string
  filename: string
  size: number
  type?: string
  key?: string
}

/**
 * 上传配置
 */
export interface UploadOptions {
  /** 上传进度回调 */
  onProgress?: (progress: number) => void
  /** 允许的文件类型 */
  accept?: string[]
  /** 最大文件大小（字节） */
  maxSize?: number
  /** 额外的表单数据 */
  data?: Record<string, any>
}

/**
 * 文件上传服务类
 */
class UploadService {
  /**
   * 默认配置
   */
  private readonly DEFAULT_MAX_SIZE = 10 * 1024 * 1024 // 10MB
  private readonly DEFAULT_ACCEPT = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  /**
   * 验证文件
   */
  private validateFile(file: File, options?: UploadOptions): void {
    const maxSize = options?.maxSize || this.DEFAULT_MAX_SIZE
    const accept = options?.accept || this.DEFAULT_ACCEPT

    // 验证文件大小
    if (file.size > maxSize) {
      throw new Error(`文件大小不能超过 ${this.formatFileSize(maxSize)}`)
    }

    // 验证文件类型
    if (accept.length > 0) {
      const isValid = accept.some((type) => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', ''))
        }
        return file.type === type || file.name.toLowerCase().endsWith(type)
      })

      if (!isValid) {
        throw new Error(`不支持的文件类型: ${file.type}`)
      }
    }
  }

  /**
   * 格式化文件大小
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0)
      return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`
  }

  /**
   * 上传单个文件
   */
  async uploadFile(file: File, options?: UploadOptions): Promise<UploadResponse> {
    // 验证文件
    this.validateFile(file, options)

    // 上传文件
    const { data } = await apiClient.upload<UploadResponse>(
      '/upload',
      file,
      {
        fieldName: 'file',
        formData: options?.data,
        onProgress: options?.onProgress,
        showSuccess: true,
        successMessage: '上传成功',
      },
    )

    return data
  }

  /**
   * 上传多个文件
   */
  async uploadFiles(files: File[], options?: UploadOptions): Promise<UploadResponse[]> {
    const results: UploadResponse[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const result = await this.uploadFile(file, {
        ...options,
        onProgress: (progress) => {
          // 计算总进度
          const totalProgress = ((i + progress / 100) / files.length) * 100
          options?.onProgress?.(Math.round(totalProgress))
        },
      })
      results.push(result)
    }

    return results
  }

  /**
   * 上传图片
   */
  async uploadImage(file: File, options?: UploadOptions): Promise<UploadResponse> {
    return this.uploadFile(file, {
      ...options,
      accept: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      maxSize: options?.maxSize || 5 * 1024 * 1024, // 5MB
    })
  }

  /**
   * 上传头像
   */
  async uploadAvatar(file: File, options?: UploadOptions): Promise<UploadResponse> {
    return this.uploadFile(file, {
      ...options,
      accept: ['image/jpeg', 'image/png'],
      maxSize: options?.maxSize || 2 * 1024 * 1024, // 2MB
      data: {
        ...options?.data,
        type: 'avatar',
      },
    })
  }

  /**
   * 上传文档
   */
  async uploadDocument(file: File, options?: UploadOptions): Promise<UploadResponse> {
    return this.uploadFile(file, {
      ...options,
      accept: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
      maxSize: options?.maxSize || 20 * 1024 * 1024, // 20MB
    })
  }

  /**
   * 上传视频
   */
  async uploadVideo(file: File, options?: UploadOptions): Promise<UploadResponse> {
    return this.uploadFile(file, {
      ...options,
      accept: ['video/mp4', 'video/webm', 'video/ogg'],
      maxSize: options?.maxSize || 100 * 1024 * 1024, // 100MB
    })
  }

  /**
   * Base64 上传
   */
  async uploadBase64(base64: string, filename: string, options?: UploadOptions): Promise<UploadResponse> {
    const { data } = await apiClient.post<UploadResponse>(
      '/upload/base64',
      {
        base64,
        filename,
        ...options?.data,
      },
      {
        showSuccess: true,
        successMessage: '上传成功',
      },
    )

    return data
  }

  /**
   * 分片上传（大文件）
   */
  async uploadChunks(
    file: File,
    chunkSize: number = 2 * 1024 * 1024, // 2MB
    options?: UploadOptions,
  ): Promise<UploadResponse> {
    const chunks = Math.ceil(file.size / chunkSize)
    const fileKey = `${Date.now()}-${file.name}`

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, file.size)
      const chunk = file.slice(start, end)

      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('chunkIndex', String(i))
      formData.append('totalChunks', String(chunks))
      formData.append('fileKey', fileKey)
      formData.append('filename', file.name)

      await apiClient.post('/upload/chunk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        showLoading: false,
      })

      // 更新进度
      const progress = Math.round(((i + 1) / chunks) * 100)
      options?.onProgress?.(progress)
    }

    // 合并分片
    const { data } = await apiClient.post<UploadResponse>('/upload/merge', {
      fileKey,
      filename: file.name,
      totalChunks: chunks,
    }, {
      showSuccess: true,
      successMessage: '上传成功',
    })

    return data
  }
}

/**
 * 导出单例
 */
export const uploadService = new UploadService()
