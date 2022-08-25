import request from '@/tools/request'

export class DeviceApi {
  // 删除设备
  delete = (mac: string) => request({
    method: 'GET',
    url: `/api/device/delDevice/${mac}`
  })

  // 获取设备信息
  infoGet = (mac: string) => request({
    method: 'GET',
    url: `/api/device/device/${mac}`
  })

  // 获取设备列表
  listGet = (params) => request({
    method: 'GET',
    url: '/device',
    params
  })

  // 修改设备信息
  infoUpdate = (params) => request({
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
}
