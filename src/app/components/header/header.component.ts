import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() openLogin = new EventEmitter<boolean>();
  @Output() openRegis = new EventEmitter<boolean>();

  title = 'Dermo App';

  constructor() { }

  formRegis() {
    console.log('Estoy rgistrando')
    this.openRegis.emit(true);
  }

  formLogin() {
    console.log('Estoy ingresando')
    this.openLogin.emit(true);
  }
}
