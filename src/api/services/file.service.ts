/**
 * 文件服务 API
 */
import type { ApiResponse, UploadConfig } from '../core'
import { fileClient } from '../clients'

/**
 * 文件信息接口
 */
export interface FileInfo {
  id: string
  name: string
  url: string
  size: number
  type: string
  createdAt: string
}

/**
 * 上传响应
 */
export interface UploadResponse {
  file: FileInfo
  url: string
}

/**
 * 批量上传响应
 */
export interface BatchUploadResponse {
  files: FileInfo[]
  successCount: number
  failCount: number
}

/**
 * 文件服务类
 */
export class FileService {
  /**
   * 上传单个文件
   */
  static uploadFile(
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<UploadResponse>> {
    return fileClient.upload<UploadResponse>('/upload', file, {
      showLoading: true,
      onProgress,
    })
  }

  /**
   * 上传多个文件
   */
  static uploadFiles(
    files: File[],
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<BatchUploadResponse>> {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    return fileClient.upload<BatchUploadResponse>('/upload/batch', formData, {
      showLoading: true,
      onProgress,
    })
  }

  /**
   * 上传图片
   */
  static uploadImage(
    file: File,
    config?: UploadConfig,
  ): Promise<ApiResponse<UploadResponse>> {
    return fileClient.upload<UploadResponse>('/upload/image', file, {
      showLoading: true,
      ...config,
    })
  }

  /**
   * 获取文件信息
   */
  static getFileInfo(id: string): Promise<ApiResponse<FileInfo>> {
    return fileClient.get<FileInfo>(`/${id}`)
  }

  /**
   * 删除文件
   */
  static deleteFile(id: string): Promise<ApiResponse<void>> {
    return fileClient.delete<void>(`/${id}`, undefined, {
      showSuccess: true,
      successMessage: '删除成功',
    })
  }

  /**
   * 下载文件
   */
  static downloadFile(
    id: string,
    filename?: string,
    onProgress?: (progress: number) => void,
  ): Promise<void> {
    return fileClient.download(`/download/${id}`, undefined, {
      filename,
      onProgress,
    })
  }

  /**
   * 获取文件列表
   */
  static getFileList(params?: any): Promise<ApiResponse<FileInfo[]>> {
    return fileClient.get<FileInfo[]>('/list', params)
  }
}
