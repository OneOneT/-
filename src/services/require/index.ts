import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

// 拦截器的执行顺序为实例请求→类请求→实例响应→类响应

class Request {
  instaance: AxiosInstance

  constructor(config: RequestConfig) {
    // 创建axios实例
    this.instaance = axios.create(config)

    // 添加全局拦截器
    // 1. 全局请求拦截器
    this.instaance.interceptors.request.use(
      (config) => {
        // console.log('全局请求拦截器')

        return config
      },
      (err) => {
        console.log(err)
      }
    )

    // 使用实例拦截器
    this.instaance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )

    this.instaance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )

    // 2. 全局响应拦截器
    //  全局响应拦截器保证最后执行
    this.instaance.interceptors.response.use(
      (res) => {
        // console.log('全局响应拦截器')

        return res.data
      },
      (err) => {
        console.log(err)
      }
    )
  }

  // this.request ==>  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  request<T = any>(config: RequestConfig<T>): Promise<T> {
    // 单次请求的成功拦截处理(单个拦截器本身就是钩子函数)
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as any)
    }

    // 返回Promise
    return new Promise((resolve, reject) => {
      this.instaance
        .request<any, T>(config)
        .then((res) => {
          // 单个响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }

          // 在全局拦截器中已将res类型改变 (res的类型不再是AxiosRequestConfig类型)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
