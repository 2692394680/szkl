import axios, { AxiosResponse } from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { MessagePlugin } from 'tdesign-vue-next'
import { TOKEN_NAME } from '@/config/global'
import { getUserStore } from '@/store/modules/user_store'

const request = axios.create({
  baseURL: 'http://co4.free.idcfengye.com',
  timeout: 5000
})

request.interceptors.request.use((config: any) => {
  nprogress.start()
  config.headers[TOKEN_NAME] = localStorage.getItem(TOKEN_NAME) || ''
  return config
}, (error: object) => {
  return Promise.reject(error)
})

/**
 * 返回数据需要以 result ? result : {} 的类型来接收
 */
request.interceptors.response.use((res: AxiosResponse) => {
  const userStore = getUserStore()
  nprogress.done()
  if (res.data.code !== 200) {
    if (res.data.msg === '请登录') {
      userStore.logout().then(() => {
      })
    }
    MessagePlugin.error(res.data.msg).then(() => {})
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(res.data.msg)
  }
  return res.data
}, (error: object) => {
  MessagePlugin.error('服务器繁忙，请稍后重试').then(() => {})
  return Promise.reject(error)
})

export default request
