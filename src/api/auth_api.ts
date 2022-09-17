import request from '@/tools/request'

export class AuthApi {
  // 获取子用户拥有的权限列表
  permissionRoleSub = (params) => request({
    method: 'GET',
    url: '/auth/getPermissionsOrRoleList',
    params
  })

  // 获取当前用户可操作的权限或角色列表
  permissionRoleController = (params) => request({
    method: 'GET',
    url: '/auth/getUserOperationalList',
    params
  })

  // 获取用户最大的权限或角色
  // permissionRoleUserMax = (params) => request({
  //   method: 'GET',
  //   url: '/auth/getUserPermissionsOrRoleMax',
  //   params
  // })

  // 获取当前用户权限/角色列表
  permissionRole = (params = {}) => request({
    method: 'GET',
    url: '/auth/getUserPermissionsOrRoleList',
    params
  })

  // 为子用户添加权限/角色
  permissionRoleSubAdd = (params) => request({
    method: 'POST',
    url: '/auth/userRole',
    params
  })

  // 删除子用户权限/角色
  permissionRoleSubDelete = (params) => request({
    method: 'DELETE',
    url: '/auth/userRole',
    params
  })
}
