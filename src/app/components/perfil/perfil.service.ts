import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_ENDPOINT } from 'src/environments/environment';
import { UserProfileRq, UserProfileRs } from './models/userProfile.model';
import { UserProfileDoctorRq, UserProfileDoctorRs } from './models/userProfileDoctor.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private http: HttpClient){}

  userProfile(profileDto: UserProfileRq): Observable<UserProfileRs> {
    const userProfileRq: UserProfileRq = { "nombre": profileDto.nombre, "edad": profileDto.edad, "pais": profileDto.pais, "ciudad": profileDto.ciudad };
    return this.http.post<UserProfileRs>(`${AUTH_ENDPOINT.baseEndpoint}${AUTH_ENDPOINT.profilePersonalPath}`, userProfileRq)
  }

  userProfileDoctor(profileDoctorDto: UserProfileDoctorRq): Observable<UserProfileDoctorRs> {
    const userProfileDoctorRq: UserProfileDoctorRq = { "especialidad": profileDoctorDto.especialidad, "identificacion": profileDoctorDto.identificacion, "vigencia": profileDoctorDto.vigencia, "licencia": profileDoctorDto.licencia };
    return this.http.post<UserProfileDoctorRs>(`${AUTH_ENDPOINT.baseEndpoint}${AUTH_ENDPOINT.profileMedicPath}`, userProfileDoctorRq)
  }
}
