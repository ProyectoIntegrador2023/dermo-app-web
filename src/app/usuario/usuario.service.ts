import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authentication } from 'src/environments/environment';
import { UserSignUpRq, UserSignUpRs } from './models/userSignUp.model';
import { UserSignInRq, UserSignInRs } from './models/userSignIn.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) { }

    userLogIn(nombre: string, contrasena: string):Observable<UserSignInRs>{
      const userSignInRq: UserSignInRq = {"email": nombre, "password": contrasena};
      return this.http.post<UserSignInRs>(`${authentication.baseEndpoint}${authentication.loginPath}`, userSignInRq)
  }

    userSignUp(nombre: string, contrasena: string): Observable<UserSignUpRs>{
      const userSignUpRq: UserSignUpRq = {"email": nombre, "password": contrasena};
      return this.http.post<UserSignUpRs>(`${authentication.baseEndpoint}${authentication.signupPath}`, userSignUpRq)
  }

}
