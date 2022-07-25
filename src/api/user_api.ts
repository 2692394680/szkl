import request from '@/tools/request'

// 获取用户信息
export const userinfoGet = () => request({
  method: 'GET',
  url: '/api/getInfo'
})
// 修改用户信息
export const userinfoUpdate = (data, code) => request({
  method: 'POST',
  url: '/api/updateInfo/' + code,
  data
})
// 获取权限列表
export const permissionListGet = () => request({
  method: 'GET',
  url: '/api/getPermissions'
})
// 获取角色列表
export const rolesListGet = () => request({
  method: 'GET',
  url: '/api/getRoles'
})
// 用户登录
export const login = (data) => request({
  method: 'POST',
  url: '/api/login',
  data
})
// 修改密码
export const passwordUpdate = (data, code) => request({
  method: 'POST',
  url: '/api/updatePassword/' + code,
  data
})
