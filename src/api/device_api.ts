import request from '@/tools/request'

export class DeviceApi {
  // 获取设备信息
  infoGet = (mac: string) => request({
    method: 'GET',
    url: `/api/device/device/${mac}`
  })

  // 获取指定用户设备列表
  listGet = (params) => request({
    method: 'GET',
    url: '/device/user',
    params
  })

  // 修改设备信息
  update = (params) => request({
    method: 'PUT',
    url: '/device/' + params.id,
    params
  })

  // 添加设备
  add = (params: object) => request({
    method: 'POST',
    url: '/device',
    params
  })

  // 禁用设备
  disable = (params: object) => request({
    method: 'DELETE',
    url: '/device',
    params
  })

  // 启用设备
  enable = (params: object) => request({
    method: 'PUT',
    url: '/device/cancelDelete',
    params
  })
}
