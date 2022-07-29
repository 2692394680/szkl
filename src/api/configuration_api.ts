import request from '@/tools/request'

export class ConfigurationApi {
  // 获取组态模板列表
  getList = (index: number, size: number) => request({
    method: 'GET',
    url: `/api/module/getModules/${index}/${size}`
  })

  // 上传组态模板
  add = (deviceId: number, data: object) => request({
    method: 'POST',
    url: `/api/module/addModule/${deviceId}`,
    data
  })
}
