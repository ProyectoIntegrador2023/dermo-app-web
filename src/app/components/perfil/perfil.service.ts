import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authentication } from 'src/environments/environment';
import { UserProfileRq, UserProfileRs } from './models/userProfile.model';
import { UserProfileDoctorRq, UserProfileDoctorRs } from './models/userProfileDoctor.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private http: HttpClient){}

  userProfile(profileDto: UserProfileRq): Observable<UserProfileRs> {
    const userProfileRq: UserProfileRq = { "nombre": profileDto.nombre, "edad": profileDto.edad, "pais": profileDto.pais, "ciudad": profileDto.ciudad };
    return this.http.post<UserProfileRs>(`${authentication.baseEndpoint}${authentication.profilePath}`, userProfileRq)
  }

  userProfileDoctor(profileDoctorDto: UserProfileDoctorRq): Observable<UserProfileDoctorRs> {
    const userProfileDoctorRq: UserProfileDoctorRq = { "especialidad": profileDoctorDto.especialidad, "identificacion": profileDoctorDto.identificacion, "vigencia": profileDoctorDto.vigencia, "licencia": profileDoctorDto.licencia };
    return this.http.post<UserProfileDoctorRs>(`${authentication.baseEndpoint}${authentication.profilePath}`, userProfileDoctorRq)
  }
}
