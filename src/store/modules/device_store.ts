import { defineStore } from 'pinia'
import store from '@/store/index_store'
import { DeviceApi } from '@/api/device_api'

const deviceApi = new DeviceApi()

export const useDeviceStore = defineStore('deviceStore', {
  state: () => ({
    deviceList: []
  }),
  actions: {
    async getDeviceList(index, size) {
      const result: any = await deviceApi.getList(index, size)
      this.deviceList = result ? result.value.devices : []
      console.log(this.deviceList)
    }
  }
})

export const getDeviceStore = () => useDeviceStore(store)
