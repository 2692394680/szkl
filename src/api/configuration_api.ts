import request from '@/tools/request'

// 获取组态模板
export const modelListGet = (index: number, size: number) => request({
  method: 'GET',
  url: `/api/module/getModules/${index}/${size}`
})
