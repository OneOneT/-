import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { IAccountLogin, IRegister } from '@/types'
import type { IUserInfoState, IUserState } from './type'
import type { IThunkState } from '@/store/style'
import { login } from '@/services/modules/login'
import {
  getUserInfo,
  registerUser,
  updateUserInfo,
  uploadAvatar
} from '@/services/modules/user'
import { localCache } from '@/utiles/cache'

// 注册
export const fetchRegister = createAsyncThunk<void, IRegister>(
  'fetch/register',
  async (extarinfo) => {
    await registerUser(extarinfo)
  }
)

//登陆
export const fetchLogin = createAsyncThunk<void, IAccountLogin>(
  'fetch/login',
  async (extrainfo, { dispatch }) => {
    const loginRes = await login(extrainfo)
    if (!loginRes) return
    dispatch(getLoginInfoAcion(loginRes))

    const { id } = loginRes

    // 获取登陆用户信息
    dispatch(fetchLoginUser(Number(id)))
  }
)

// 获取登陆用户
export const fetchLoginUser = createAsyncThunk<void, number>(
  'fetch/loginUser',
  async (id, { dispatch }) => {
    const res = await getUserInfo(Number(id))
    dispatch(getLoginUserAction(res))
  }
)

// 获取某个用户信息
export const fetchUserInfo = createAsyncThunk<void, number>(
  'fetch/userInfo',
  async (id, { dispatch }) => {
    const res = await getUserInfo(Number(id))
    dispatch(getUserInfoAction(res))
  }
)

//更新用户信息
export const fetchUpdateUserInfo = createAsyncThunk<
  void,
  IUserInfoState,
  IThunkState
>('fetch/updateUserInfo', async (extarinfo, { getState }) => {
  const id = getState().user.id!

  await updateUserInfo(id, extarinfo)
})

// 上传头像接口
export const fetchLoadAvatar = createAsyncThunk<void, any, IThunkState>(
  'fetch/uploadAvatar',
  async (file) => {
    await uploadAvatar(file)
  }
)

const initialState: IUserState = {
  id: undefined,
  name: '',
  token: '',
  loginUser: {}, //登陆用户
  userInfo: {}
}

const UserStore = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getLoginInfoAcion(state, { payload }) {
      const { id, name, token } = payload

      // 保存信息
      state.id = id
      state.name = name
      state.token = token

      localCache.setCache('id', id)
      localCache.setCache('token', token)
      localCache.setCache('name', name)
    },

    getLoginUserAction(state, { payload }) {
      state.loginUser = payload

      localCache.setCache('loginUser', payload)
    },

    getUserInfoAction(state, { payload }) {
      state.userInfo = payload
    },

    // 页面加载
    loadLocalUserInfo(state) {
      state.id = localCache.getCache('id')
      state.name = localCache.getCache('name')
      state.token = localCache.getCache('token')
      state.loginUser = localCache.getCache('loginUser')
    }
  }
})

export const {
  getLoginInfoAcion,
  getLoginUserAction,
  getUserInfoAction,
  loadLocalUserInfo
} = UserStore.actions
export default UserStore.reducer
