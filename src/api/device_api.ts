import request from '@/tools/request'

export class DeviceApi {
  // 删除设备
  delete = (mac: string) => request({
    method: 'GET',
    url: `/api/device/delDevice/${mac}`
  })

  // 获取设备信息
  getInfo = (mac: string) => request({
    method: 'GET',
    url: `/api/device/device/${mac}`
  })

  // 获取设备列表
  getList = (params) => request({
    method: 'GET',
    url: '/device/getDeviceList',
    params
  })

  // 修改设备信息
  updateInfo = (data: object) => request({
    method: 'POST',
    url: '/api/device/update'
  })

  // 添加设备
  add = (data: object) => request({
    method: 'POST',
    url: '/admin/addDevice',
    data
  })
}
