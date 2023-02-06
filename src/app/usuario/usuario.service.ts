import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authentication, environment } from 'src/environments/environment';
import { UserSignUpRq, UserSignUpRs } from './models/userSignUp.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private backUrl = "http://localhost:5000"

    constructor(private http: HttpClient) { }

    userLogIn(nombre: string, contrasena: string):Observable<any>{
      return this.http.post<any>(`${this.backUrl}/logIn`, {"nombre": nombre, "contrasena": contrasena });
  }

    userSignUp(nombre: string, contrasena: string): Observable<UserSignUpRs>{
      const userSignUpRq: UserSignUpRq = {"email": nombre, "password": contrasena};
      return this.http.post<UserSignUpRs>(`${authentication.baseEndpoint}${authentication.signupPath}`, userSignUpRq)
  }

}
