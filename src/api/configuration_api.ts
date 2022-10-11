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
    url: '/model',
    data,
    params
  })

  // 更新组�获取组态详细信息
  detail = (url) => request({
    method: 'GET',
    url
  })

  // 上传图片
  addImage = (data) => request({
    url: '/model/image',
    method: 'POST',
    data
  })

  // 删除图片
  deleteImage = (params) => request({
    url: '/model/image',
    method: 'DELETE',
    params
  })
}
