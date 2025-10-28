/**
 * 数据导出通用 Composable
 * 处理数据导出、下载等逻辑
 */

import { ref } from 'vue'

export interface UseExportOptions {
  /** 导出函数 */
  exportFn: (params: any) => Promise<Blob>
  /** 文件名 */
  filename?: string
  /** 导出前回调 */
  onBeforeExport?: (params: any) => boolean | Promise<boolean>
  /** 导出成功回调 */
  onSuccess?: () => void
  /** 导出失败回调 */
  onError?: (error: any) => void
}

export function useExport(options: UseExportOptions) {
  const {
    exportFn,
    filename = 'export.xlsx',
    onBeforeExport,
    onSuccess,
    onError,
  } = options

  // 导出状态
  const exporting = ref(false)

  // 导出进度
  const progress = ref(0)

  // 导出数据
  const handleExport = async (params: any = {}) => {
    if (onBeforeExport) {
      const canExport = await onBeforeExport(params)
      if (!canExport)
        return
    }

    exporting.value = true
    progress.value = 0

    try {
      // 模拟进度
      const progressInterval = setInterval(() => {
        if (progress.value < 90) {
          progress.value += 10
        }
      }, 200)

      // 导出数据
      const blob = await exportFn(params)

      clearInterval(progressInterval)
      progress.value = 100

      // 下载文件
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)

      onSuccess?.()
    }
    catch (error) {
      console.error('Export failed:', error)
      onError?.(error)
      throw error
    }
    finally {
      exporting.value = false
      progress.value = 0
    }
  }

  return {
    // 状态
    exporting,
    progress,

    // 方法
    handleExport,
  }
}
