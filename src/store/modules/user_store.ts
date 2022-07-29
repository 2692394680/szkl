import { defineStore } from 'pinia'
import store from '@/store/index_store'
import { TOKEN_NAME, USERINFO_NAME } from '@/config/global'
import { MessagePlugin } from 'tdesign-vue-next'
import router from '@/router/index_router'
import { login, userinfoGet } from '@/api/user_api'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token',
    userinfo: JSON.parse(sessionStorage.getItem(USERINFO_NAME) || '{}')
  }),
  actions: {
    async getUserInfo() {
      const result: any = await userinfoGet()
      this.userinfo = result ? result.value : {}
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
      const result: any = await login(data)
      this.userinfo = result ? result.value : {}
      this.token = result ? result.msg.substring(8, result.msg.length) : ''
      localStorage.setItem(TOKEN_NAME, this.token)
      sessionStorage.setItem(USERINFO_NAME, JSON.stringify(this.userinfo || {}))
      await MessagePlugin.success('欢迎回来' + this.userinfo.name)
      await router.push('/configuration')
    }
  }
})

export const getUserStore = () => useUserStore(store)
