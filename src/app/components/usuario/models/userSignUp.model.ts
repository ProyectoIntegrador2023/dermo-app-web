export interface UserSignUpRq {
  email: string,
  password: string
}

export interface UserSignUpRs {
  email: string,
  lastLoginAt: string,
  id: number
}
