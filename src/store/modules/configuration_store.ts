import { defineStore } from 'pinia'
import store from '@/store/index_store'

export const useConfigurationStore = defineStore('configurationStore', {
  state: () => ({
    canvasList: <any>JSON.parse(sessionStorage.getItem('canvasList') || '[{}]')
  }),
  actions: {
    // 将数据保存至浏览器缓存
    saveDesignData() {
      sessionStorage.setItem('canvasList', JSON.stringify(this.canvasList))
    }
  }
})

export const getConfigurationStore = () => useConfigurationStore(store)
