export interface UserProfileDoctorRq {
  specialty: string,
  licenceId: number,
  licenceValidityDate: string,
  licenceImage: string
}

export interface UserProfileDoctorRs {
  specialty: string,
  licenceId: number,
  licenceValidityDate: string,
  licenceImage: string,
  createdAt: string,
  updatedAt: string,
  token: string
}
