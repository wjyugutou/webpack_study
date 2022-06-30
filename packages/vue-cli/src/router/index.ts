import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/about',
    component: () => import('@/components/About.vue'),
  }, {
    path: '/home',
    component: () => import('@/components/Home.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})
export default router
