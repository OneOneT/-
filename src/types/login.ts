export interface IAccountLogin {
  name: string
  password: string
}

export interface IRegister extends IAccountLogin {
  nickename: string
  emain?: string
  confirmPassword?: string
}
