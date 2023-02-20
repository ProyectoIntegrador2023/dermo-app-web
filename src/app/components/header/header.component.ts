import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() openLogin = new EventEmitter<boolean>();
  @Output() openRegis = new EventEmitter<boolean>();

  title = 'Dermo App';

  constructor() {
    // no es necesario llamar a super() aquí
  }

  formRegis() {
    console.log('Estoy registrando')
    this.openRegis.emit(true);
  }

  formLogin() {
    console.log('Estoy ingresando')
    this.openLogin.emit(true);
  }
}
