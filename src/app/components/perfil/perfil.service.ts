import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AUTH_ENDPOINT} from 'src/environments/environment';
import {UserProfileRq} from './models/userProfile.model';
import {UserProfileDoctorRq} from './models/userProfileDoctor.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private http: HttpClient) {
  }

  getUserProfile(): Observable<any> {
    const medicEmail = sessionStorage.getItem('email');
    return this.http.get<any>(`${AUTH_ENDPOINT.baseEndpoint}${AUTH_ENDPOINT.profilePersonalPath}/${medicEmail}`,
      {
        observe: 'response'
      }
    )
  }

  userProfile(profileDto: UserProfileRq, isUpdate: boolean): Observable<any> {
    const userProfileRq: UserProfileRq = {
      name: profileDto.name,
      age: profileDto.age,
      country: profileDto.country,
      city: profileDto.city,
      email: sessionStorage.getItem('email') as string
    };
    const endpoint = `${AUTH_ENDPOINT.baseEndpoint}${AUTH_ENDPOINT.profilePersonalPath}`;

    return (isUpdate) ? this.userProfilePut(endpoint, userProfileRq) : this.userProfilePost(endpoint, userProfileRq);
  }

  private userProfilePost(endpoint: string, userProfileRq: UserProfileRq) {
    return this.http.post<any>(endpoint, userProfileRq,
      {
        observe: 'response'
      }
    );
  }

  private userProfilePut(endpoint: string, userProfileRq: UserProfileRq) {
    return this.http.put<any>(endpoint, userProfileRq,
      {
        observe: 'response'
      }
    );
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
