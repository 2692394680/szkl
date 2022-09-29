import { defineStore } from 'pinia'
import store from '@/store/index_store'
import { DeviceApi } from '@/api/device_api'
import { MessagePlugin } from 'tdesign-vue-next'

const deviceApi = new DeviceApi()

export const useDeviceStore = defineStore('deviceStore', {
  state: () => ({
    deviceList: [],
    // 子用户id，查看子用户设备
    userId: '',
    // 授权设备表单
    toUserForm: {
      deviceId: '',
      userId: '',
      note: ''
    }
  }),
  actions: {
    async getDeviceList(params) {
      const result: any = await deviceApi.list(params) || {}
      this.deviceList = result.value?.records
    },
    // 授权设备给用户
    async toUser() {
      if (!this.toUserForm.note) this.toUserForm.note = '备注'
      await deviceApi.toUser(this.toUserForm)
      await MessagePlugin.success('授权成功')
    }
  }
})

export const getDeviceStore = () => useDeviceStore(store)
