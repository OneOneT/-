import IRequest from '@/services'
import { IUserInfoState } from '@/store/moudles/user/type'
import { IRegister } from '@/types'

// 用户注册
export const registerUser = (payload: IRegister) => {
  return IRequest.post({
    url: '/user/create',
    data: payload
  })
}

// 获取用户信息
export const getUserInfo = (id: number) => {
  return IRequest.get({
    url: `/user/${id}`
  })
}

// 编辑用户信息
export const updateUserInfo = (id: number, payload: IUserInfoState) => {
  return IRequest.patch({
    url: `/user/${id}`,
    data: payload
  })
}

// 用户头像上传
export const uploadAvatar = (file: any) => {
  return IRequest.post({
    url: '/user/avatar',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: {
      avatar: file
    }
  })
}
