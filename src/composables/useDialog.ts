/**
 * 对话框通用 Composable
 * 处理对话框的打开、关闭、确认等逻辑
 */

import { ref } from 'vue'

export interface UseDialogOptions {
  /** 初始可见状态 */
  initialVisible?: boolean
  /** 打开前回调 */
  onBeforeOpen?: () => boolean | Promise<boolean>
  /** 打开后回调 */
  onOpened?: () => void
  /** 关闭前回调 */
  onBeforeClose?: () => boolean | Promise<boolean>
  /** 关闭后回调 */
  onClosed?: () => void
  /** 确认回调 */
  onConfirm?: () => void | Promise<void>
  /** 取消回调 */
  onCancel?: () => void
}

export function useDialog(options: UseDialogOptions = {}) {
  const {
    initialVisible = false,
    onBeforeOpen,
    onOpened,
    onBeforeClose,
    onClosed,
    onConfirm,
    onCancel,
  } = options

  // 可见状态
  const visible = ref(initialVisible)

  // 加载状态
  const loading = ref(false)

  // 打开对话框
  const open = async () => {
    if (onBeforeOpen) {
      const canOpen = await onBeforeOpen()
      if (!canOpen)
        return
    }

    visible.value = true
    onOpened?.()
  }

  // 关闭对话框
  const close = async () => {
    if (onBeforeClose) {
      const canClose = await onBeforeClose()
      if (!canClose)
        return
    }

    visible.value = false
    onClosed?.()
  }

  // 确认
  const confirm = async () => {
    if (!onConfirm) {
      close()
      return
    }

    try {
      loading.value = true
      await onConfirm()
      close()
    }
    catch (error) {
      console.error('Dialog confirm failed:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  // 取消
  const cancel = () => {
    onCancel?.()
    close()
  }

  // 切换
  const toggle = () => {
    if (visible.value) {
      close()
    }
    else {
      open()
    }
  }

  return {
    // 状态
    visible,
    loading,

    // 方法
    open,
    close,
    confirm,
    cancel,
    toggle,
  }
}
