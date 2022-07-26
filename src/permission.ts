import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router/index_router'
import { getUserStore } from '@/store/modules/user_store'
import { MessagePlugin } from 'tdesign-vue-next'

NProgress.configure({ showSpinner: false })
const userStore = getUserStore()
// 白名单页面
const whiteListRouters = ['LoginRegister', 'Welcome']
const loginRoutePath = '/loginRegister/login'

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const {
    token
  } = userStore
  if (token === 'main_token' && !whiteListRouters.includes(<string>to.name)) {
    next({ path: loginRoutePath })
    await MessagePlugin.error('当前没有访问权限，请登录后再访问')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
