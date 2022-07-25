import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 自动导入modules文件夹下所有ts文件
const modules = import.meta.globEager('./modules/**/*.ts')
// 路由暂存
const routeModuleList: Array<RouteRecordRaw> = []
Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// 存放动态路由
export const asyncRouterList: Array<RouteRecordRaw> = [...routeModuleList]

// 存放固定路由
export const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/home/WelcomeView.vue')
  },
  {
    path: '/loginRegister/:type',
    name: 'LoginRegister',
    component: () => import('@/views/user/LoginRegisterView.vue')
  }
]

export const allRoutes = [...defaultRouterList, ...asyncRouterList]

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes
})

export default router
