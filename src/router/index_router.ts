import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 自动导入modules文件夹下所有ts文件
const userModules = import.meta.globEager('./modules/**/user*.ts')
const managerModules = import.meta.globEager('./modules/**/manager*.ts')

// 路由暂存
const routeModuleUserList: Array<RouteRecordRaw> = []
const routeModuleManagerList: Array<RouteRecordRaw> = []
Object.keys(userModules).forEach(key => {
  const mod = userModules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleUserList.push(...modList)
})
Object.keys(managerModules).forEach(key => {
  const mod = managerModules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleManagerList.push(...modList)
})

// 存放动态路由
export const asyncRouterUserList: Array<RouteRecordRaw> = [...routeModuleUserList]
export const asyncRouterManagerList: Array<RouteRecordRaw> = [...routeModuleManagerList]

// 存放固定路由
export const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/common/home/WelcomeView.vue')
  },
  {
    path: '/loginRegister/:type',
    name: 'LoginRegister',
    // 修复： 防止/loginRegister,/后面乱传参导致页面异常问题(hash模式)
    // props($route){
    //     if ($route.params.type != "register" && $route.params.type != "login") {
    //         $route.params={
    //             type: 'login'
    //         }
    //     }
    // },
    component: () => import('@/views/common/user/LoginRegisterView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/common/NotFound.vue')
  }
]

export const allRoutes = [...defaultRouterList, ...asyncRouterUserList, ...asyncRouterManagerList]
console.log(allRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes
})

export default router
