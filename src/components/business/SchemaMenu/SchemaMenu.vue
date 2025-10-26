<script setup lang="ts">
import type { SchemaMenuEmits, SchemaMenuProps } from './types'
import { useRouter } from 'vue-router'
import { useMenuItems, useMenuState } from './composables'

const props = withDefaults(defineProps<SchemaMenuProps>(), {
  mode: 'inline',
  theme: 'light',
  collapsible: false,
  collapsed: false,
  multiple: false,
  inlineIndent: 24,
  showIcon: true,
})

const emit = defineEmits<SchemaMenuEmits>()

const router = useRouter()
const itemsRef = toRef(props, 'items')

// 菜单项处理
const { visibleItems, findItemByKey, findItemByPath, getParentKeys } = useMenuItems(itemsRef)

// 菜单状态
const {
  selectedKeys,
  openKeys,
  selectItem: internalSelectItem,
  openSubMenu: internalOpenSubMenu,
  closeSubMenu: internalCloseSubMenu,
} = useMenuState(
  props.defaultSelectedKeys,
  props.defaultOpenKeys,
  toRef(props, 'selectedKeys'),
  toRef(props, 'openKeys'),
)

/**
 * 处理菜单项点击
 */
function handleMenuClick({ key }: { key: string | number }) {
  let keyStr = String(key)

  // 移除前缀
  if (keyStr.startsWith('item-')) {
    keyStr = keyStr.replace('item-', '')
  }
  else if (keyStr.startsWith('submenu-')) {
    keyStr = keyStr.replace('submenu-', '')
  }

  const item = findItemByKey(keyStr)
  if (!item || item.disabled) {
    return
  }

  // 更新选中状态
  internalSelectItem(keyStr)
  emit('update:selectedKeys', [keyStr])
  emit('select', keyStr, item)

  // 处理路由跳转
  if (item.path) {
    router.push(item.path)
  }
  else if (item.route) {
    router.push(item.route)
  }
  else if (item.href) {
    if (item.target === '_blank') {
      window.open(item.href, '_blank')
    }
    else {
      window.location.href = item.href
    }
  }

  // 执行自定义点击事件
  item.onClick?.()
}

/**
 * 处理子菜单展开/关闭
 */
function handleOpenChange(keys: (string | number)[]) {
  if (props.collapsed) {
    return
  }

  // 移除前缀
  const stringKeys = keys.map((k) => {
    const keyStr = String(k)
    return keyStr.startsWith('submenu-') ? keyStr.replace('submenu-', '') : keyStr
  })

  openKeys.value = stringKeys
  emit('update:openKeys', stringKeys)
  emit('openChange', stringKeys)
}

/**
 * 选中菜单项
 */
function selectItem(key: string) {
  internalSelectItem(key)
  emit('update:selectedKeys', [key])

  // 自动展开父级菜单
  const parentKeys = getParentKeys(key)
  if (parentKeys.length > 0) {
    openKeys.value = [...new Set([...openKeys.value, ...parentKeys])]
    emit('update:openKeys', openKeys.value)
  }
}

/**
 * 展开子菜单
 */
function openSubMenu(key: string) {
  internalOpenSubMenu(key)
  emit('update:openKeys', openKeys.value)
}

/**
 * 关闭子菜单
 */
function closeSubMenu(key: string) {
  internalCloseSubMenu(key)
  emit('update:openKeys', openKeys.value)
}

/**
 * 根据当前路由更新选中状态
 */
function updateSelectedByRoute() {
  const currentPath = router.currentRoute.value.path
  const found = findItemByPath(currentPath)

  if (found) {
    internalSelectItem(found.key)
    emit('update:selectedKeys', [found.key])

    // 自动展开父级菜单
    if (!props.collapsed) {
      const parentKeys = getParentKeys(found.key)
      if (parentKeys.length > 0) {
        openKeys.value = [...new Set([...openKeys.value, ...parentKeys])]
        emit('update:openKeys', openKeys.value)
      }
    }
  }
}

// 初始化时根据路由选中菜单
onMounted(() => {
  updateSelectedByRoute()
})

// 监听路由变化
watch(() => router.currentRoute.value.path, () => {
  updateSelectedByRoute()
})

// 监听折叠状态
watch(() => props.collapsed, (isCollapsed) => {
  if (isCollapsed) {
    openKeys.value = []
    emit('update:openKeys', [])
  }
})

// 暴露方法
defineExpose({
  selectItem,
  openSubMenu,
  closeSubMenu,
  getSelectedKeys: () => selectedKeys.value,
  getOpenKeys: () => openKeys.value,
})
</script>

<template>
  <a-menu
    :mode="mode"
    :theme="theme"
    :inline-collapsed="collapsible && mode === 'inline' ? collapsed : undefined"
    :inline-indent="inlineIndent"
    :selected-keys="selectedKeys.map(k => `item-${k}`)"
    :open-keys="openKeys.map(k => `submenu-${k}`)"
    @click="handleMenuClick"
    @open-change="handleOpenChange"
  >
    <template
      v-for="item in visibleItems"
      :key="item.key"
    >
      <!-- 有子菜单 -->
      <a-sub-menu
        v-if="item.children && item.children.length > 0"
        :key="`submenu-${item.key}`"
        :disabled="item.disabled"
      >
        <template #icon>
          <component
            :is="item.icon"
            v-if="showIcon && item.icon"
          />
        </template>
        <template #title>
          {{ item.title }}
        </template>

        <!-- 递归渲染子菜单 -->
        <template
          v-for="child in item.children"
          :key="child.key"
        >
          <!-- 子菜单还有子菜单 -->
          <a-sub-menu
            v-if="child.children && child.children.length > 0"
            :key="`submenu-${child.key}`"
            :disabled="child.disabled"
          >
            <template #icon>
              <component
                :is="child.icon"
                v-if="showIcon && child.icon"
              />
            </template>
            <template #title>
              {{ child.title }}
            </template>

            <!-- 三级菜单 -->
            <a-menu-item
              v-for="grandChild in child.children"
              :key="`item-${grandChild.key}`"
              :disabled="grandChild.disabled"
            >
              <template #icon>
                <component
                  :is="grandChild.icon"
                  v-if="showIcon && grandChild.icon"
                />
              </template>
              {{ grandChild.title }}
            </a-menu-item>
          </a-sub-menu>

          <!-- 普通子菜单项 -->
          <a-menu-item
            v-else
            :key="`item-${child.key}`"
            :disabled="child.disabled"
          >
            <template #icon>
              <component
                :is="child.icon"
                v-if="showIcon && child.icon"
              />
            </template>
            {{ child.title }}
          </a-menu-item>
        </template>
      </a-sub-menu>

      <!-- 普通菜单项 -->
      <a-menu-item
        v-else
        :key="`item-${item.key}`"
        :disabled="item.disabled"
      >
        <template #icon>
          <component
            :is="item.icon"
            v-if="showIcon && item.icon"
          />
        </template>
        {{ item.title }}
      </a-menu-item>
    </template>
  </a-menu>
</template>
