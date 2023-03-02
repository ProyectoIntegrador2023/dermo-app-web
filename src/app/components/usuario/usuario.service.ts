import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AUTH_ENDPOINT} from 'src/environments/environment';
import {UserSignUpRq, UserSignUpRs} from './models/userSignUp.model';
import {UserSignInRq, UserSignInRs} from './models/userSignIn.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  userLogIn(loginDto: UserSignInRq): Observable<UserSignInRs> {
    const userSignInRq: UserSignInRq = {"email": loginDto.email, "password": loginDto.password};
    return this.http.post<UserSignInRs>(`${AUTH_ENDPOINT.baseEndpoint}${AUTH_ENDPOINT.loginPath}`, userSignInRq);
  }

  userSignUp(signUpDto: UserSignUpRq): Observable<UserSignUpRs> {
    const userSignUpRq: UserSignUpRq = {"email": signUpDto.email, "password": signUpDto.password};
    return this.http.post<UserSignUpRs>(`${AUTH_ENDPOINT.baseEndpoint}${AUTH_ENDPOINT.signupPath}`, userSignUpRq);
  }

  finalizeSession() {
    console.log('Cerrando sesion...');
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
