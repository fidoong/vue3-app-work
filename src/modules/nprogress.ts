import type { RouteLocationNormalized } from 'vue-router'
import type { UserModule } from '~/types'
import NProgress from 'nprogress'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      if (to.path !== from.path)
        NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
}
