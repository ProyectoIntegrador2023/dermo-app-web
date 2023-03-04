import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-navegacion',
  templateUrl: './side-bar-navegacion.component.html',
  styleUrls: ['./side-bar-navegacion.component.css']
})
export class SideBarNavegacionComponent {
  constructor(private router: Router) {}
}
