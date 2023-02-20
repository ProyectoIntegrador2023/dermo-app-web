import { Component } from '@angular/core';

@Component({
  selector: 'app-home-out',
  templateUrl: './home-out.component.html',
  styleUrls: ['./home-out.component.css']
})
export class HomeOutComponent {

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
