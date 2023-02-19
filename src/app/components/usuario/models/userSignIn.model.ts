export interface UserSignInRq {
  email: string,
  password: string
}

export interface UserSignInRs {
  email: string,
  token: string,
}
