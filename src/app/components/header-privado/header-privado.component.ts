import { Component } from '@angular/core';

@Component({
  selector: 'app-header-privado',
  templateUrl: './header-privado.component.html',
  styleUrls: ['./header-privado.component.css']
})
export class HeaderPrivadoComponent {
  mostrarMenu = false;

  onUserIconClick() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  crearPerfil() {
    console.log('Crear perfil');
  }

  crearPerfilMedico() {
    console.log('Crear perfil médico');
  }
}

