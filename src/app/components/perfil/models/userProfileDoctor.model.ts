export interface UserProfileDoctorRq {
  especialidad: string,
  identificacion: number,
  vigencia: string,
  licencia: string
}

export interface UserProfileDoctorRs {
  especialidad: string,
  identificacion: number,
  vigencia: string,
  licencia: string,
  token: string // revisar //
}
