import { defineStore } from 'pinia'
import store from '@/store/index_store'

export const useDeviceStore = defineStore('deviceStore', {
  state: () => ({
    deviceList: []
  }),
  actions: {}
})

export const getDeviceStore = () => useDeviceStore(store)
