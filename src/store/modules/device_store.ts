import { defineStore } from 'pinia'
import store from '@/store/index_store'
import { DeviceApi } from '@/api/device_api'

const deviceApi = new DeviceApi()

export const useDeviceStore = defineStore('deviceStore', {
  state: () => ({
    deviceList: [],
    // 子用户id
    userId: ''
  }),
  actions: {
    async getDeviceList(params) {
      const result: any = await deviceApi.list(params) || {}
      this.deviceList = result.value?.records
    }
  }
})

export const getDeviceStore = () => useDeviceStore(store)
