import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  regis: boolean = false;

  @Output() openLogin = new EventEmitter<boolean>();

  title = 'Dermo App';

  constructor() { }

  formRegis() {
    this.regis = true;
  }

  formLogin() {
    console.log('Estoy ingresando')
    this.openLogin.emit(true);
  }
}

