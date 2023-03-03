import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { authentication } from 'src/environments/environment';
import { UserProfileRq, UserProfileRs } from './models/userProfile.model';
import { UserProfileDoctorRq, UserProfileDoctorRs } from './models/userProfileDoctor.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private http: HttpClient){}

  userProfile(profileDto: UserProfileRq): Observable<UserProfileRs> {
    const userProfileRq: UserProfileRq = { "name": profileDto.name, "age": profileDto.age, "country": profileDto.country, "city": profileDto.city };
    return this.http.post<UserProfileRs>(`${authentication.baseEndpoint}${authentication.profilePath}`, userProfileRq)
      .pipe(
        tap((res)=>{
          const token = res.token;
          sessionStorage.setItem('token', token);
        })
      );
  }

  userProfileDoctor(profileDoctorDto: UserProfileDoctorRq): Observable<UserProfileDoctorRs> {
    const userProfileDoctorRq: UserProfileDoctorRq = { "specialty": profileDoctorDto.specialty, "licenceId": profileDoctorDto.licenceId, "licenceValidityDate": profileDoctorDto.licenceValidityDate, "licenceImage": profileDoctorDto.licenceImage };
    return this.http.post<UserProfileDoctorRs>(`${authentication.baseEndpoint}${authentication.profilePath}`, userProfileDoctorRq)
  }
}
