import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
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
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/HomeView.vue')
  },
  {
    path: '/loginRegister/:type',
    name: 'LoginRegister',
    component: () => import('@/views/user/LoginRegisterView.vue')
    // redirect: 'login',
    // children: [
    //   {
    //     path: 'login',
    //     name: 'Login',
    //     component: () => import('@/views/user/UserLogin.vue')
    //   }, {
    //     path: 'register',
    //     name: 'Register',
    //     component: () => import('@/views/user/UserRegister.vue')
    //   }
    // ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
