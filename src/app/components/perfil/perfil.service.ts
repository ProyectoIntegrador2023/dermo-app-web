import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AUTH_ENDPOINT} from 'src/environments/environment';
import {UserProfileRq, UserProfileRs} from './models/userProfile.model';
import {UserProfileDoctorRq, UserProfileDoctorRs} from './models/userProfileDoctor.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private http: HttpClient) {
  }

  userProfile(profileDto: UserProfileRq): Observable<any> {
    const userProfileRq: UserProfileRq = {
      name: profileDto.name,
      age: profileDto.age,
      country: profileDto.country,
      city: profileDto.city,
      email: sessionStorage.getItem('email') as string
    };
    return this.http.post<any>(`${AUTH_ENDPOINT.baseEndpoint}${AUTH_ENDPOINT.profilePersonalPath}`,
      userProfileRq,
      {
        observe: 'response'
      }
    )
  }

  userProfileDoctor(profileDoctorDto: UserProfileDoctorRq): Observable<any> {
    const userProfileDoctorRq: UserProfileDoctorRq = {
      specialty: profileDoctorDto.specialty,
      licenceId: profileDoctorDto.licenceId,
      licenceValidityDate: profileDoctorDto.licenceValidityDate,
      licenceImage: profileDoctorDto.licenceImage,
      email: sessionStorage.getItem('email') as string
    };
    return this.http.post<any>(`${AUTH_ENDPOINT.baseEndpoint}${AUTH_ENDPOINT.profileMedicPath}`,
      userProfileDoctorRq,
      {
        observe: 'response'
      }
    )
  }
}
