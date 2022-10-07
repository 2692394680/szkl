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

  // 检查登录
  isLogin = () => request({
    method: 'GET',
    url: '/user/isLogin'
  })

  // 获取用户信息
  info = (params) => request({
    method: 'GET',
    url: '/user',
    params
  })

  // 修改用户信息
  infoUpdate = (params) => request({
    method: 'PUT',
    url: '/user',
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
    url: '/user/updateInfoCode',
    params
  })

  // 找回密码验证码
  passwordResetCode = (params) => request({
    method: 'GET',
    url: '/user/updatePasswordCode',
    params
  })

  // 新增子用户
  subAdd = (params) => request({
    method: 'PUT',
    url: '/user/insertUser',
    params
  })

  // 子用户列表
  subList = (params) => request({
    method: 'GET',
    url: '/user/getSubUserList',
    params
  })

  // 子用户信息修改
  subUpdate = (params) => request({
    method: 'PUT',
    url: '/user/updateUserInfo',
    params
  })

  // 禁用子用户
  subDisable = (params) => request({
    method: 'DELETE',
    url: '/user',
    params
  })

  // 启用子用户
  subEnable = (params) => request({
    method: 'PUT',
    url: '/user/cancelDeleteUser',
    params
  })

  // 修改子用户密码
  subPasswordReset = (params) => request({
    method: 'PUT',
    url: '/user/updateUserPassword',
    params
  })
}
