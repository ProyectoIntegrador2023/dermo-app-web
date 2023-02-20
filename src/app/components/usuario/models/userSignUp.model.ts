export interface UserSignUpRq {
  email: string,
  password: string
}

export interface UserSignUpRs {
  createdAt: string,
  email: string,
  lastLoginAt: string,
  id: number
}
