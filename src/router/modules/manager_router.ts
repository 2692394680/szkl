import Layout from '@/layouts'

export default [{
  path: '/manager/controller',
  redirect: '/configuration',
  meta: { hidden: true }
}, {
  path: '/manager/configuration',
  name: 'ManagerConfiguration',
  component: Layout,
  redirect: '/configuration/model',
  meta: { title: '组态设计' },
  children: [
    {
      path: 'model',
      name: 'ManagerModel',
      component: () => import('@/views/common/configuration/ModelView.vue'),
      meta: { title: '模型组态' }
    }
  ]
}, {
  path: '/manager/configuration/design',
  name: 'ManagerDesign',
  component: () => import('@/views/common/configuration/DesignView.vue'),
  meta: { title: '组态设计', hidden: true }
}, {
  path: '/manager/device',
  name: 'ManagerDevice',
  component: Layout,
  redirect: '/device/network',
  meta: { title: '设备管理' },
  children: [
    {
      path: 'network',
      name: 'ManagerNetwork',
      component: () => import('@/views/common/device/NetworkView.vue'),
      meta: { title: '联网设备' }
    }, {
      path: 'network-manager',
      name: 'ManagerNetworkManager',
      component: () => import('@/views/common/device/NetworkView.vue'),
      meta: { title: '管理员-联网设备' }
    }
  ]
}, {
  path: '/manager/user',
  name: 'ManagerUser',
  component: Layout,
  meta: {
    title: '用户中心',
    hidden: false
  },
  children: [
    {
      path: 'info',
      name: 'ManagerCenter',
      component: () => import('@/views/common/user/CenterView.vue'),
      meta: { title: '个人信息' }
    }, {
      path: 'sub-user',
      name: 'ManagerSubUser',
      component: () => import('@/views/common/user/SubUserView.vue'),
      meta: { title: '子用户' }
    }
  ]
}]
