/**
 * 文件上传通用 Composable
 * 处理文件上传、进度、预览等逻辑
 */

import type { Ref } from 'vue'
import { computed, ref } from 'vue'

export interface UploadFile {
  uid: string
  name: string
  status: 'uploading' | 'done' | 'error'
  url?: string
  percent?: number
  response?: any
  error?: any
}

export interface UseUploadOptions {
  /** 上传函数 */
  upload: (file: File) => Promise<{ url: string }>
  /** 最大文件数 */
  maxCount?: number
  /** 最大文件大小（MB） */
  maxSize?: number
  /** 允许的文件类型 */
  accept?: string[]
  /** 上传成功回调 */
  onSuccess?: (file: UploadFile) => void
  /** 上传失败回调 */
  onError?: (file: UploadFile, error: any) => void
}

export function useUpload(options: UseUploadOptions) {
  const {
    upload,
    maxCount = 1,
    maxSize = 10,
    accept = [],
    onSuccess,
    onError,
  } = options

  // 文件列表
  const fileList = ref<UploadFile[]>([]) as Ref<UploadFile[]>

  // 上传中的文件数
  const uploadingCount = computed(() =>
    fileList.value.filter(f => f.status === 'uploading').length,
  )

  // 是否正在上传
  const isUploading = computed(() => uploadingCount.value > 0)

  // 是否达到最大数量
  const isMaxCount = computed(() => fileList.value.length >= maxCount)

  // 验证文件
  const validateFile = (file: File): { valid: boolean, message?: string } => {
    // 验证大小
    if (file.size > maxSize * 1024 * 1024) {
      return {
        valid: false,
        message: `文件大小不能超过 ${maxSize}MB`,
      }
    }

    // 验证类型
    if (accept.length > 0) {
      const fileType = file.type
      const fileName = file.name
      const fileExt = fileName.substring(fileName.lastIndexOf('.'))

      const isAccepted = accept.some((type) => {
        if (type.startsWith('.')) {
          return fileExt === type
        }
        return fileType.match(type)
      })

      if (!isAccepted) {
        return {
          valid: false,
          message: `只能上传 ${accept.join(', ')} 格式的文件`,
        }
      }
    }

    return { valid: true }
  }

  // 上传文件
  const handleUpload = async (file: File) => {
    // 验证文件
    const validation = validateFile(file)
    if (!validation.valid) {
      console.error(validation.message)
      return
    }

    // 检查数量限制
    if (isMaxCount.value) {
      console.error(`最多只能上传 ${maxCount} 个文件`)
      return
    }

    // 创建文件对象
    const uploadFile: UploadFile = {
      uid: `${Date.now()}-${Math.random()}`,
      name: file.name,
      status: 'uploading',
      percent: 0,
    }

    fileList.value.push(uploadFile)

    try {
      // 上传文件
      const result = await upload(file)

      // 更新状态
      uploadFile.status = 'done'
      uploadFile.url = result.url
      uploadFile.percent = 100
      uploadFile.response = result

      onSuccess?.(uploadFile)
    }
    catch (error) {
      // 更新状态
      uploadFile.status = 'error'
      uploadFile.error = error

      onError?.(uploadFile, error)
    }
  }

  // 移除文件
  const removeFile = (file: UploadFile) => {
    const index = fileList.value.findIndex(f => f.uid === file.uid)
    if (index > -1) {
      fileList.value.splice(index, 1)
    }
  }

  // 清空文件列表
  const clearFiles = () => {
    fileList.value = []
  }

  // 获取文件 URL 列表
  const getUrls = () => {
    return fileList.value
      .filter(f => f.status === 'done' && f.url)
      .map(f => f.url!)
  }

  return {
    // 数据
    fileList,
    uploadingCount,
    isUploading,
    isMaxCount,

    // 方法
    handleUpload,
    removeFile,
    clearFiles,
    getUrls,
    validateFile,
  }
}
