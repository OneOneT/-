import Request from './require'

import { BASE_URL, TIMEOUT } from './config'
import { localCache } from '@/utiles/cache'
import { message } from 'antd'
// import { message } from '@/utiles/global-ant'

const IRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn(config) {
      // console.log('单哥实例拦截器')
      const token = localCache.getCache('token') ?? ''

      // console.log(token)

      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config
    },
    responseSuccessFn(res: any) {
      // console.log('单个实例响应成功拦截器')

      const data = res.data

      if (data && data.code === 0) {
        message.success(data.mes)
        return data
      } else {
        message.error(data.mes)
        return false
      }
    }
  }
})

export default IRequest
