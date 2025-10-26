/**
 * 弹窗管理
 */

import type { Component } from 'vue'
import type { ModalCloseType, ModalInstance, ModalOptions, ModalResult } from '../types'

type AsyncComponentLoader = () => Promise<Component>
type ModalComponent = Component | AsyncComponentLoader

const modalInstances = reactive<Map<string, ModalInstance>>(new Map())
const modalStack = shallowRef<string[]>([])

const ANIMATION_DELAY = 300
const BASE_Z_INDEX = 1000

/**
 * 生成唯一 ID
 */
function generateId(): string {
  return `modal_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}

/**
 * 获取最大层级
 */
function getMaxLevel(): number {
  let maxLevel = BASE_Z_INDEX
  modalInstances.forEach((instance) => {
    if (instance.visible && instance.level > maxLevel) {
      maxLevel = instance.level
    }
  })
  return maxLevel
}

/**
 * 判断是否为异步组件加载器
 */
function isAsyncComponentLoader(component: ModalComponent): component is AsyncComponentLoader {
  return typeof component === 'function' && component.length === 0
}

/**
 * 解析组件
 */
function resolveComponent(component: ModalComponent): Component {
  if (isAsyncComponentLoader(component)) {
    return defineAsyncComponent({
      loader: component,
      delay: 200,
      timeout: 10000,
    })
  }
  return component
}

export interface UseModalReturn {
  /** 弹窗实例映射 */
  modalInstances: Map<string, ModalInstance>
  /** 弹窗栈 */
  modalStack: Ref<string[]>
  /** 打开弹窗 */
  openModal: <T = any, R = any>(
    component: ModalComponent,
    options?: ModalOptions<T>
  ) => Promise<ModalResult<R>>
  /** 打开异步弹窗 */
  openAsyncModal: <T = any, R = any>(
    loader: AsyncComponentLoader,
    options?: ModalOptions<T>
  ) => Promise<ModalResult<R>>
  /** 关闭弹窗 */
  closeModal: <R = any>(id?: string, result?: R, type?: ModalCloseType) => void
  /** 关闭所有弹窗 */
  closeAllModals: () => void
  /** 获取当前弹窗 */
  getCurrentModal: () => ModalInstance | undefined
  /** 获取指定弹窗 */
  getModal: (id: string) => ModalInstance | undefined
  /** 预加载组件 */
  preloadComponent: (loader: AsyncComponentLoader) => Promise<Component>
}

/**
 * 弹窗管理 Hook
 */
export function useModal(): UseModalReturn {
  /**
   * 打开弹窗
   */
  function openModal<T = any, R = any>(
    component: ModalComponent,
    options: ModalOptions<T> = {},
  ): Promise<ModalResult<R>> {
    return new Promise((resolve, reject) => {
      const id = generateId()
      const currentModalId = modalStack.value[modalStack.value.length - 1]
      const parentInstance = currentModalId ? modalInstances.get(currentModalId) : undefined
      const level = parentInstance ? parentInstance.level + 1 : getMaxLevel() + 1
      const resolvedComponent = resolveComponent(component)

      const instance: ModalInstance<T, R> = {
        id,
        component: markRaw(resolvedComponent),
        options: {
          footer: null,
          ...options,
          zIndex: options.zIndex || level,
        },
        visible: false,
        resolve: (result?: R) => {
          resolve({ data: result, type: 'confirm', action: 'confirm' })
        },
        reject: (reason?: any) => {
          if (reason?.type) {
            resolve(reason)
          }
          else {
            reject(reason)
          }
        },
        parentId: parentInstance?.id,
        children: [],
        level,
      }

      if (parentInstance) {
        parentInstance.children.push(id)
      }

      modalInstances.set(id, instance)
      modalStack.value = [...modalStack.value, id]

      nextTick(() => {
        const modalInstance = modalInstances.get(id)
        if (modalInstance) {
          modalInstance.visible = true
        }
      })
    })
  }

  /**
   * 关闭弹窗
   */
  function closeModal<R = any>(
    id?: string,
    result?: R,
    type: ModalCloseType = 'close',
  ) {
    const targetId = id || modalStack.value[modalStack.value.length - 1]
    if (!targetId)
      return

    const instance = modalInstances.get(targetId)
    if (!instance)
      return

    // 递归关闭子弹窗
    if (instance.children.length > 0) {
      [...instance.children].forEach(childId => closeModal(childId, undefined, 'close'))
    }

    // 从父弹窗移除引用
    if (instance.parentId) {
      const parentInstance = modalInstances.get(instance.parentId)
      if (parentInstance) {
        parentInstance.children = parentInstance.children.filter(childId => childId !== targetId)
      }
    }

    instance.visible = false
    modalStack.value = modalStack.value.filter(stackId => stackId !== targetId)

    setTimeout(() => {
      modalInstances.delete(targetId)
    }, ANIMATION_DELAY)

    if (type === 'confirm') {
      instance.resolve(result)
    }
    else {
      instance.reject({ data: result, type, action: type })
    }
  }

  /**
   * 关闭所有弹窗
   */
  function closeAllModals() {
    Array.from(modalInstances.keys()).forEach(id => closeModal(id, undefined, 'close'))
  }

  /**
   * 获取当前弹窗
   */
  function getCurrentModal(): ModalInstance | undefined {
    const currentId = modalStack.value[modalStack.value.length - 1]
    return currentId ? modalInstances.get(currentId) : undefined
  }

  /**
   * 获取指定弹窗
   */
  function getModal(id: string): ModalInstance | undefined {
    return modalInstances.get(id)
  }

  /**
   * 打开异步弹窗
   */
  function openAsyncModal<T = any, R = any>(
    loader: AsyncComponentLoader,
    options: ModalOptions<T> = {},
  ): Promise<ModalResult<R>> {
    return openModal(loader, options)
  }

  /**
   * 预加载组件
   */
  async function preloadComponent(loader: AsyncComponentLoader): Promise<Component> {
    try {
      return await loader()
    }
    catch (error) {
      console.error('预加载组件失败:', error)
      throw error
    }
  }

  return {
    modalInstances,
    modalStack,
    openModal,
    openAsyncModal,
    closeModal,
    closeAllModals,
    getCurrentModal,
    getModal,
    preloadComponent,
  }
}

// 全局弹窗实例
export const globalModal = useModal()
