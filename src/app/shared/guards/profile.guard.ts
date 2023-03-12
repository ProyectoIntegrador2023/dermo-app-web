import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(
    private readonly toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const medicId = sessionStorage.getItem('medicId');
    if(!medicId || Number(medicId) === 0) {
      this.toastr.error('Por favor registre su perfil antes de realizar un diagnostico', 'Registre su perfil');
      setTimeout(() => {
        this.router.navigate(['home-in/crear-perfil'])
      }, 3000);
      return false;
    }
    return true;
  }
}
