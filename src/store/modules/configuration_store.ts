import { defineStore } from 'pinia'
import store from '@/store/index_store'

export const useConfigurationStore = defineStore('configurationStore', {
  state: () => ({}),
  actions: {}
})

export const getConfigurationStore = () => useConfigurationStore(store)
