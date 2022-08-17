import { defineStore } from 'pinia'
import store from '@/store/index_store'
import { TOKEN_NAME, USERINFO_NAME } from '@/config/global'
import { MessagePlugin } from 'tdesign-vue-next'
import router from '@/router/index_router'
import { UserApi } from '@/api/user_api'

const userApi = new UserApi()

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token',
    userinfo: JSON.parse(sessionStorage.getItem(USERINFO_NAME) || '{}'),
    time: 60,
    timeTrue: true
  }),
  actions: {
    async getUserInfo() {
      const result: any = await userApi.userinfoGet() || {}
      this.userinfo = result.value
      sessionStorage.setItem(USERINFO_NAME, JSON.stringify(this.userinfo))
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME)
      sessionStorage.removeItem(USERINFO_NAME)
      this.token = 'main_token'
      this.userinfo = {}
      await router.push('/loginRegister/login')
    },
    async login(event, data) {
      if (typeof event.validateResult === 'object') return
      const result: any = await userApi.login(data) || {}
      this.userinfo = result.value
      this.token = result.msg.substring(8, result.msg.length)
      localStorage.setItem(TOKEN_NAME, this.token)
      sessionStorage.setItem(USERINFO_NAME, JSON.stringify(this.userinfo || {}))
      await MessagePlugin.success('欢迎回来' + this.userinfo.name)
      await router.push('/configuration')
    },
    async register(event, data) {
      if (typeof event.validateResult === 'object') return
      await userApi.register(data)
      await MessagePlugin.success('注册成功')
      await router.push('/loginRegister/register')
    },
    // 获取验证码
    async getCode(phone, type) {
      if (phone === '') {
        await MessagePlugin.warning('请输入手机号')
        return
      }
      this.time = 60
      this.timeTrue = false
      switch (type) {
        case 'register':
          userApi.registerCode({ phone })
          break
        case 'userinfo':
          userApi.userinfoUpdateCode({ phone })
          break
        case 'password':
          break
      }
      const timeStop = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          clearTimeout(timeStop)
          this.timeTrue = true
        }
      }, 1000)
    }
  }
})

export const getUserStore = () => useUserStore(store)
