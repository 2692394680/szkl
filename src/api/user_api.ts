import request from '@/tools/request'

export class UserApi {
  // 用户登录
  login = (params) => request({
    method: 'POST',
    url: '/user/login',
    params
  })

  // 用户注册
  register = (params) => request({
    method: 'POST',
    url: '/user/register/' + params.code,
    params
  })

  // 获取用户信息
  userinfoGet = (params) => request({
    method: 'GET',
    url: '/user/userInfo',
    params
  })

  // 修改用户信息
  userinfoUpdate = (data, code) => request({
    method: 'POST',
    url: '/api/updateInfo/' + code,
    data
  })

  // 获取权限列表
  permissionListGet = () => request({
    method: 'GET',
    url: '/api/getPermissions'
  })

  // 获取角色列表
  rolesListGet = () => request({
    method: 'GET',
    url: '/api/getRoles'
  })

  // 修改密码
  passwordUpdate = (data, code) => request({
    method: 'POST',
    url: '/api/updatePassword/' + code,
    data
  })

  // 用户注册验证码
  registerCode = (params) => request({
    method: 'GET',
    url: '/user/registerCode',
    params
  })

  // 更新用户信息验证码
  userinfoUpdateCode = (params) => request({
    method: 'GET',
    url: '/user/updateUserInfoCode',
    params
  })

  // 找回密码验证码
  passwordResetCode = (params) => request({
    method: 'GET',
    url: '/user/updatePasswordCode',
    params
  })
}
