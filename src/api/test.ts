import request from './tools/request';

export function test() {
    return request({
        method: 'get',
        url: '/product/getBaseCategoryList'
    })
}