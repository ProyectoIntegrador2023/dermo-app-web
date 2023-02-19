import { Component } from '@angular/core';

@Component({
  selector: 'app-home-out',
  templateUrl: './home-out.component.html',
  styleUrls: ['./home-out.component.css']
})
export class HomeOutComponent {

  login: boolean = false;
  regis: boolean = false;

  eventLogin(bol: boolean) {
    this.login = bol;
  }

  eventRegis(bol: boolean) {
    this.regis = bol;
  }

}
