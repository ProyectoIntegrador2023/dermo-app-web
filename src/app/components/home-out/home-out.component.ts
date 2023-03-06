import { Component } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-home-out',
  templateUrl: './home-out.component.html',
  styleUrls: ['./home-out.component.css']
})
export class HomeOutComponent {

  constructor (
    private usuarioService: UsuarioService
    ){
      this.usuarioService.finalizeSession();
    }

  login = false;
  regis = false;

  eventLogin(bol: boolean) {
    this.login = bol;
  }

  eventRegis(bol: boolean) {
    console.log('estoy ingresando a home regis')
    this.regis = bol;
  }

}
