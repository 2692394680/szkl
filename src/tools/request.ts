import {AxiosRequestConfig, AxiosResponse} from "axios";
import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'


const request=axios.create({
    baseURL: "https://api.github.com/repos",
    timeout: 5000
})

request.interceptors.request.use((config:AxiosRequestConfig) => {
    nprogress.start();
    return config
}, (error:object) => {
    return Promise.reject(error)
})

request.interceptors.response.use((res:AxiosResponse) => {
    nprogress.done();
    return res
}, (error:object) => {
    return Promise.reject(error)
})

export default request