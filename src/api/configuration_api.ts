import request from '@/tools/request'

export class ConfigurationApi {
  // 获取组态模板列表
  getList = (params) => request({
    method: 'GET',
    url: '/model',
    params
  })

  // 上传组态模板
  add = (deviceId: number, data: object) => request({
    method: 'POST',
    url: `/api/module/addModule/${deviceId}`,
    data
  })
}
