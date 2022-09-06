import request from '@/tools/request'

export class AuthApi {
  // 获取子用户可操作的权限或角色列表
  permissionRoleListGet = (params) => request({
    method: 'GET',
    url: '/auth/getPermissionsOrRoleList',
    params
  })

  // 获取用户可操作的权限或角色列表
  permissionRoleManageListGet = (params) => request({
    method: 'GET',
    url: '/auth/getUserOperationalList',
    params
  })
}
