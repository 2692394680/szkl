import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { MessagePlugin } from 'tdesign-vue-next'

const request = axios.create({
  baseURL: 'http://81.69.253.228:8080',
  timeout: 5000
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
  nprogress.start()
  return config
}, (error: object) => {
  return Promise.reject(error)
})

request.interceptors.response.use((res: AxiosResponse) => {
  nprogress.done()
  if (res.data.code === 403) {
    MessagePlugin.error('登录信息失效，请重新登录').then(() => {})
  }
  return res.data
}, (error: object) => {
  return Promise.reject(error)
})

export default request
