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
  infoGet = (params) => request({
    method: 'GET',
    url: '/user/userInfo',
    params
  })

  // 修改用户信息
  infoUpdate = (params) => request({
    method: 'PUT',
    url: '/user/userInfo/' + params.code,
    params
  })

  // 重置密码
  passwordReset = (params) => request({
    method: 'GET',
    url: '/user/updatePassword/' + params.code,
    params
  })

  // 用户注册验证码
  registerCode = (params) => request({
    method: 'GET',
    url: '/user/registerCode',
    params
  })

  // 更新用户信息验证码
  infoUpdateCode = (params) => request({
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
