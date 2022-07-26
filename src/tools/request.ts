import axios, { AxiosResponse } from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { MessagePlugin } from 'tdesign-vue-next'
import { TOKEN_NAME } from '@/config/global'
import { getUserStore } from '@/store/modules/user_store'

const request = axios.create({
  baseURL: 'http://81.69.253.228:8080',
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
  switch (res.data.code) {
    case 500:
      MessagePlugin.error('服务器繁忙，请稍后再试').then(() => {
      })
      return
    case 403:
      userStore.logout().then(() => {
      })
      MessagePlugin.error('登录信息失效，请重新登录').then(() => {
      })
      return
    case 200:
      return res.data
    default:
      MessagePlugin.error(res.data.msg).then(() => {
      })
  }
}, (error: object) => {
  MessagePlugin.error('请求失败，请稍后重试').then(() => {})
  return Promise.reject(error)
})

export default request
