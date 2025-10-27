/**
 * 主题抽屉管理 Composable
 */

const drawerVisible = ref(false)

export function useThemeDrawer() {
  function openDrawer() {
    drawerVisible.value = true
  }

  function closeDrawer() {
    drawerVisible.value = false
  }

  function toggleDrawer() {
    drawerVisible.value = !drawerVisible.value
  }

  return {
    drawerVisible: readonly(drawerVisible),
    openDrawer,
    closeDrawer,
    toggleDrawer,
  }
}
