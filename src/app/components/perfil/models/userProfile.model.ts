export interface UserProfileRq {
  nombre: string,
  edad: number,
  pais: string,
  ciudad: string
}

export interface UserProfileRs {
  nombre: string,
  edad: number,
  pais: string,
  ciudad: string,
  token: string
}
