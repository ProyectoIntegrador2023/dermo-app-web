import { Component } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-header-privado',
  templateUrl: './header-privado.component.html',
  styleUrls: ['./header-privado.component.css']
})
export class HeaderPrivadoComponent {
  mostrarMenu = false;

  constructor(private readonly usuarioService: UsuarioService) {}

  onUserIconClick() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  crearPerfil() {
    console.log('Crear perfil');
  }

  crearPerfilMedico() {
    console.log('Crear perfil médico');
  }

  finalizeSession() {
    this.usuarioService.finalizeSession();
  }
}

