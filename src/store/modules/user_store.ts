import { defineStore } from 'pinia'
import store from '@/store/index_store'
import { TOKEN_NAME, USERINFO_NAME } from '@/config/global'
import { MessagePlugin } from 'tdesign-vue-next'
import router from '@/router/index_router'
import { login } from '@/api/user_api'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token',
    userinfo: reactive<any>({})
  }),
  actions: {
    async getUserInfo() {
      console.log('getUserInfo')
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME)
      sessionStorage.removeItem(USERINFO_NAME)
      this.token = 'main_token'
      this.userinfo = {}
    },
    async login(event, data) {
      if (!event.validateResult) return
      const result: any = await login(data)
      console.log(result)
      if (result.code !== 200) {
        await MessagePlugin.error('登陆失败，请重新登录')
        return
      }
      this.userinfo = result.value
      this.token = result.msg.substring(8, result.msg.length)
      localStorage.setItem(TOKEN_NAME, this.token)
      sessionStorage.setItem(USERINFO_NAME, JSON.stringify(this.userinfo || {}))
      await router.push('/configuration')
      await MessagePlugin.success('欢迎回来' + this.userinfo.name)
    }
  }
})

export const getUserStore = () => useUserStore(store)
