/**
 * 全局组件类型声明
 * 用于改善 IDE 的类型提示
 */

import type { DefineComponent } from 'vue'
import type { ApiCascaderProps } from './ApiCascader/types'
import type { ApiCheckboxGroupProps } from './ApiCheckboxGroup/types'
import type { ApiRadioGroupProps } from './ApiRadioGroup/types'
import type { ApiSelectProps } from './ApiSelect/types'
import type { ApiTreeSelectProps } from './ApiTreeSelect/types'
import type { TextEllipsisProps } from './TextEllipsis/types'

declare module 'vue' {
  export interface GlobalComponents {
    /**
     * ApiSelect - API 驱动的下拉选择器
     *
     * 支持异步数据加载、字段映射、数据转换等功能
     *
     * @example
     * ```vue
     * <ApiSelect
     *   v-model:value="userId"
     *   :api="fetchUsers"
     *   :option-config="{ valueField: 'id', labelField: 'name' }"
     *   placeholder="请选择用户"
     *   @loaded="handleLoaded"
     * />
     * ```
     */
    ApiSelect: DefineComponent<ApiSelectProps>

    /**
     * ApiTreeSelect - API 驱动的树形选择器
     *
     * 用于组织架构、多级分类等层级数据选择
     *
     * @example
     * ```vue
     * <ApiTreeSelect
     *   v-model:value="deptId"
     *   :api="fetchDepartments"
     *   :tree-node-config="{ valueField: 'id', titleField: 'name' }"
     * />
     * ```
     */
    ApiTreeSelect: DefineComponent<ApiTreeSelectProps>

    /**
     * ApiCascader - API 驱动的级联选择器
     *
     * 用于省市区、多级分类等级联数据选择
     *
     * @example
     * ```vue
     * <ApiCascader
     *   v-model:value="area"
     *   :api="fetchAreas"
     *   :option-config="{ valueField: 'code', labelField: 'name' }"
     * />
     * ```
     */
    ApiCascader: DefineComponent<ApiCascaderProps>

    /**
     * ApiRadioGroup - API 驱动的单选组
     *
     * 用于状态选择、类型选择等单选场景
     *
     * @example
     * ```vue
     * <ApiRadioGroup
     *   v-model:value="status"
     *   :api="fetchStatuses"
     *   option-type="button"
     * />
     * ```
     */
    ApiRadioGroup: DefineComponent<ApiRadioGroupProps>

    /**
     * ApiCheckboxGroup - API 驱动的多选组
     *
     * 用于权限选择、标签选择等多选场景
     *
     * @example
     * ```vue
     * <ApiCheckboxGroup
     *   v-model:value="permissions"
     *   :api="fetchPermissions"
     * />
     * ```
     */
    ApiCheckboxGroup: DefineComponent<ApiCheckboxGroupProps>

    /**
     * TextEllipsis - 文本超出显示组件
     *
     * 支持单行/多行文本超出显示 tooltip，自动检测是否超出
     *
     * @example
     * ```vue
     * <!-- 单行文本超出 -->
     * <TextEllipsis content="这是一段很长的文本" />
     *
     * <!-- 多行文本超出 -->
     * <TextEllipsis :lines="3" content="这是一段很长的文本" />
     * ```
     */
    TextEllipsis: DefineComponent<TextEllipsisProps>
  }
}

export {}
