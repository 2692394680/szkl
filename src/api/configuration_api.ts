import request from '@/tools/request'

export class ConfigurationApi {
  // 获取组态列表
  list = (params) => request({
    method: 'GET',
    url: '/model/list',
    params
  })

  // 上传组态
  add = (params, data) => request({
    method: 'POST',
    url: '/model',
    data,
    params
  })

  // 更新组态
  update = (params, data) => request({
    method: 'PUT',
    url: '/model/data',
    data,
    params
  })

  // 编辑组态
  edit = (params) => request({
    method: 'PUT',
    url: '/model/info',
    params
  })

  // 获取在线JSON数据
  data = (url) => request({
    method: 'GET',
    url
  })

  // 上传图片
  addImage = (data) => request({
    method: 'POST',
    url: '/model/image',
    data
  })

  // 删除图片
  deleteImage = (params) => request({
    method: 'DELETE',
    url: '/model/image',
    params
  })

  // 禁用组态
  disable = (params) => request({
    method: 'PUT',
    url: '/model/disableModel',
    params
  })

  // 启用组态
  enable = (params) => request({
    method: 'PUT',
    url: '/model/enableModel',
    params
  })

  // 删除组态
  delete = (params) => request({
    method: 'DELETE',
    url: '/model/deleteModel',
    params
  })
}
