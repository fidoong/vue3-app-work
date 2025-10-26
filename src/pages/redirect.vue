<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const route = router.currentRoute.value

// 获取重定向路径和查询参数
const { redirect, ...query } = route.query
const redirectPath = (redirect as string) || '/'

// 立即重定向到目标路径
router.replace({
  path: redirectPath,
  query: Object.keys(query).length > 0 ? query : undefined,
})
</script>

<template>
  <div class="redirect-page">
    <a-spin size="large" />
  </div>
</template>

<style scoped lang="scss">
.redirect-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
