import request from '@/tools/request'

export class ConfigurationApi {
  // 获取组态模板列表
  listGet = (params) => request({
    method: 'GET',
    url: '/model',
    params
  })

  // 上传组态模板
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
  detailGet = (url) => request({
    method: 'GET',
    url
  })
}
