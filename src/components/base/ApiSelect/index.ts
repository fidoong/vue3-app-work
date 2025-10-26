/**
 * ApiSelect - API 驱动的下拉选择器
 *
 * 基于 Ant Design Vue Select 封装，支持异步数据加载
 *
 * @example
 * ```vue
 * <script setup>
 * import { ApiSelect } from '@/components/base/ApiSelect'
 *
 * async function fetchUsers() {
 *   const res = await fetch('/api/users')
 *   return res.json()
 * }
 *
 * const userId = ref()
 * </script>
 *
 * <template>
 *   <ApiSelect
 *     v-model:value="userId"
 *     :api="fetchUsers"
 *     :option-config="{ valueField: 'id', labelField: 'name' }"
 *     placeholder="请选择用户"
 *   />
 * </template>
 * ```
 */

export { default as ApiSelect } from './ApiSelect.vue'
export * from './composables'
export * from './types'
