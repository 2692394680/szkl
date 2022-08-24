import Layout from '@/layouts'

export default [{
  path: '/controller',
  redirect: '/configuration',
  meta: { hidden: true }
}, {
  path: '/configuration',
  name: 'Configuration',
  component: Layout,
  redirect: '/configuration/model',
  meta: { title: '组态设计' },
  children: [
    {
      path: 'model',
      name: 'Model',
      component: () => import('@/views/configuration/ModelView.vue'),
      meta: { title: '模型组态' }
    }
  ]
}, {
  path: '/configuration/design',
  name: 'Design',
  component: () => import('@/views/configuration/DesignView.vue'),
  meta: { title: '组态设计', hidden: true }
}, {
  path: '/device',
  name: 'Device',
  component: Layout,
  redirect: '/device/network',
  meta: { title: '设备管理' },
  children: [
    {
      path: 'network',
      name: 'Network',
      component: () => import('@/views/device/NetworkView.vue'),
      meta: { title: '联网设备' }
    }
  ]
}, {
  path: '/manager',
  name: 'Manager',
  component: Layout,
  redirect: '/manager/user',
  meta: { title: '管理员' },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/manager/UserView.vue'),
      meta: { title: '用户管理' }
    }
  ]
}, {
  path: '/user/:type',
  name: 'User',
  component: Layout,
  meta: {
    title: '个人中心',
    hidden: true
  },
  children: [
    {
      path: '',
      name: 'UserCenter',
      component: () => import('@/views/user/UserCenterView.vue'),
      meta: { title: '个人信息' }
    }
  ]
}]
