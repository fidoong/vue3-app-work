<script setup lang="ts">
import type { DropdownButtonEmits, DropdownButtonProps, DropdownMenuItem } from './types'
import { Button, Dropdown, Menu, MenuDivider, MenuItem, SubMenu } from 'ant-design-vue'

const props = withDefaults(defineProps<DropdownButtonProps>(), {
  text: '更多操作',
  type: 'default',
  size: 'middle',
  disabled: false,
  loading: false,
  danger: false,
  placement: 'bottomLeft',
  trigger: 'click',
})

const emit = defineEmits<DropdownButtonEmits>()

/**
 * 过滤可见的菜单项
 */
const visibleItems = computed(() => {
  return props.items.filter(item => item.visible !== false)
})

/**
 * 处理菜单项点击
 */
function handleMenuClick(key: string) {
  const item = findMenuItem(props.items, key)
  if (item) {
    item.onClick?.()
    emit('select', key, item)
  }
}

/**
 * 查找菜单项
 */
function findMenuItem(items: DropdownMenuItem[], key: string): DropdownMenuItem | undefined {
  for (const item of items) {
    if (item.key === key) {
      return item
    }
    if (item.children) {
      const found = findMenuItem(item.children, key)
      if (found) {
        return found
      }
    }
  }
  return undefined
}

/**
 * 渲染菜单项内容
 */
function renderMenuItemContent(item: DropdownMenuItem) {
  const content = []

  if (item.icon) {
    if (typeof item.icon === 'string') {
      content.push(h('span', { class: [item.icon, 'mr-2'] }))
    }
    else {
      content.push(h(item.icon, { class: 'mr-2' }))
    }
  }

  content.push(item.label)
  return content
}

/**
 * 渲染菜单项
 */
function renderMenuItem(item: DropdownMenuItem): any {
  if (item.divider) {
    return h(MenuDivider, { key: item.key })
  }

  // 如果有子菜单
  if (item.children && item.children.length > 0) {
    return h(
      SubMenu,
      {
        key: item.key,
        disabled: item.disabled,
      },
      {
        title: () => renderMenuItemContent(item),
        default: () => item.children!.map(child => renderMenuItem(child)),
      },
    )
  }

  // 普通菜单项
  return h(
    MenuItem,
    {
      key: item.key,
      disabled: item.disabled,
      danger: item.danger,
    },
    {
      default: () => renderMenuItemContent(item),
    },
  )
}

/**
 * 渲染菜单
 */
function renderMenu() {
  return h(
    Menu,
    {
      onClick: (info: any) => handleMenuClick(String(info.key)),
    },
    {
      default: () => visibleItems.value.map(item => renderMenuItem(item)),
    },
  )
}

/**
 * 渲染下拉按钮
 */
function renderDropdownButton() {
  const buttonContent: any[] = []

  if (props.icon) {
    if (typeof props.icon === 'string') {
      buttonContent.push(h('span', { class: [props.icon, 'mr-1'] }))
    }
    else {
      buttonContent.push(h(props.icon, { class: 'mr-1' }))
    }
  }

  buttonContent.push(props.text)

  if (props.dropdownIcon) {
    if (typeof props.dropdownIcon === 'string') {
      buttonContent.push(h('span', { class: [props.dropdownIcon, 'ml-1'] }))
    }
    else {
      buttonContent.push(h(props.dropdownIcon, { class: 'ml-1' }))
    }
  }
  else {
    buttonContent.push(h('span', { class: 'i-carbon-chevron-down ml-1' }))
  }

  return h(
    Dropdown,
    {
      placement: props.placement,
      trigger: [props.trigger],
      disabled: props.disabled,
    },
    {
      default: () => h(
        Button,
        {
          type: props.type,
          size: props.size,
          disabled: props.disabled,
          loading: props.loading,
          danger: props.danger,
        },
        {
          default: () => buttonContent,
        },
      ),
      overlay: renderMenu,
    },
  )
}
</script>

<template>
  <component :is="renderDropdownButton()" />
</template>

<style scoped>
:deep(.ant-dropdown-menu-item),
:deep(.ant-dropdown-menu-submenu-title) {
  display: flex;
  align-items: center;
}

:deep(.ant-dropdown-menu-item > span),
:deep(.ant-dropdown-menu-submenu-title > span) {
  display: inline-flex;
  align-items: center;
}
</style>
