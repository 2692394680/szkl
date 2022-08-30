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
        //修复： 防止/loginRegister,/后面乱传参导致页面异常问题(hash模式)
        // props($route){
        //     if ($route.params.type != "register" && $route.params.type != "login") {
        //         $route.params={
        //             type: 'login'
        //         }
        //     }
        // },
        component: () => import('@/views/user/LoginRegisterView.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
    }
]

export const allRoutes = [...defaultRouterList, ...asyncRouterList]

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes
})

export default router
