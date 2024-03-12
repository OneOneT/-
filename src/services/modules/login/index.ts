import IRequest from '@/services'
import { IAccountLogin } from '@/types'

export const login = (account: IAccountLogin) => {
  return IRequest.post({
    url: '/login',
    data: account
  })
}
