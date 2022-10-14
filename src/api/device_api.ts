import request from '@/tools/request'

export class DeviceApi {
  // 获取设备列表
  list = (params) => request({
    method: 'GET',
    url: '/device',
    params
  })

  // 修改设备信息
  update = (params) => request({
    method: 'PUT',
    url: '/device/' + params.deviceId,
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

  // 上传设备图片
  addImage = (data: object) => request({
    method: 'POST',
    url: '/device/image',
    data
  })

  // 删除图片
  deleteImage = (params) => request({
    method: 'DELETE',
    url: '/model/image',
    params
  })

  // 获取授权记录列表
  authList = (params: object) => request({
    method: 'GET',
    url: '/device/user/getAuthorization',
    params
  })

  // 删除用户设备使用权
  authDelete = (params: object) => request({
    method: 'DELETE',
    url: '/device/user',
    params
  })

  // 获取使用权设备列表
  useList = (params) => request({
    method: 'GET',
    url: '/device/user',
    params
  })

  // 使用权-启用设备
  authEnable = (params: object) => request({
    method: 'PUT',
    url: '/device/user/enableUserDevice',
    params
  })

  // 使用权-禁用设备
  authDisable = (params: object) => request({
    method: 'PUT',
    url: '/device/user/disableUserDevice',
    params
  })

  // 使用权-修改设备备注
  authNote = (params: object) => request({
    method: 'PUT',
    url: '/device/user',
    params
  })

  // 授权设备给用户
  toUser = (params: object) => request({
    method: 'POST',
    url: '/device/user',
    params
  })
}
