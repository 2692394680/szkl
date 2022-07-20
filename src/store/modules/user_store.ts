import { defineStore } from 'pinia'
import store from '@/store/index_store'
import { TOKEN_NAME } from '@/config/global'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token',
    userinfo: {}
  }),
  actions: {}
})

export const getUserStore = () => useUserStore(store)
