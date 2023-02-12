import { Component } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent {

  helper = new JwtHelperService();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  error = false

  onLogInUsuario(nombre: string, contrasena: string){
    this.error = false

    this.usuarioService.userLogIn(nombre, contrasena)
    .subscribe(res => {
      console.log(res);
      const token = res.token;
      sessionStorage.setItem('token', token);
      this.router.navigate(['/login']);
      this.showSuccess()
    },
    error => {
      console.error(error);
      this.error=true
    })
  }

  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showSuccess() {
    this.toastr.success(`Ha ingresado exitosamente`, "Inicio exitoso");
  }

}
