import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {authentication} from 'src/environments/environment';
import {UserSignUpRq, UserSignUpRs} from './models/userSignUp.model';
import {UserSignInRq, UserSignInRs} from './models/userSignIn.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  userLogIn(loginDto: UserSignInRq): Observable<UserSignInRs> {
    const userSignInRq: UserSignInRq = {"email": loginDto.email, "password": loginDto.password};
    return this.http.post<UserSignInRs>(`${authentication.baseEndpoint}${authentication.loginPath}`, userSignInRq)
      .pipe(
        tap((res) => {
          const token = res.token;
          sessionStorage.setItem('token', token);
        })
      );
  }

  userSignUp(signUpDto: UserSignUpRq): Observable<UserSignUpRs> {
    const userSignUpRq: UserSignUpRq = {"email": signUpDto.email, "password": signUpDto.password};
    return this.http.post<UserSignUpRs>(`${authentication.baseEndpoint}${authentication.signupPath}`, userSignUpRq)
      .pipe(
        tap((res) => {
          const token = res.lastLoginAt;
          sessionStorage.setItem('lastLoginAt', token);
        })
      );
  }
}
