export interface IUserState {
  id: number | undefined
  name: string
  token: string
  loginUser: IUserInfoState
  userInfo: IUserInfoState
}

export interface IUserInfoState {
  id?: number
  name?: string
  nickname?: string
  email?: string
  sex?: string
  phone?: string
  avatarUrl?: string
  createAt?: string
  updateAt?: string
}
