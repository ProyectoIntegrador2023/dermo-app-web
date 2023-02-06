import { Component } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent {

  helper = new JwtHelperService();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  error = false

  onLogInUsuario(nombre: string, contrasena: string){
    this.error = false

    this.usuarioService.userLogIn(nombre, contrasena)
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.router.navigate([`${decodedToken.sub}/${res.token}`])
    },
    error => {
      this.error=true
    })
  }
}
