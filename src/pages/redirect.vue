<script lang="ts">
import { Spin } from 'ant-design-vue'
import { defineComponent, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { parseRedirect } from '~/utils/redirect'

export default defineComponent({
  name: 'RedirectPage',
  components: {
    ASpin: Spin,
  },
  setup() {
    const router = useRouter()

    onBeforeMount(() => {
      const route = router.currentRoute.value

      // 解析重定向信息
      const { path, query } = parseRedirect(route)

      // 立即重定向到目标路径
      router.replace({
        path,
        query,
      })
    })

    return {}
  },
})
</script>

<template>
  <div class="redirect-page">
    <ASpin size="large" />
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
