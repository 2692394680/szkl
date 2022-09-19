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
  path: '/user',
  name: 'User',
  component: Layout,
  meta: {
    title: '用户中心',
    hidden: false
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      component: () => import('@/views/user/CenterView.vue'),
      meta: { title: '个人信息' }
    }, {
      path: 'sub-user',
      name: 'SubUser',
      component: () => import('@/views/user/SubUserView.vue'),
      meta: { title: '子用户' }
    }
  ]
}]
