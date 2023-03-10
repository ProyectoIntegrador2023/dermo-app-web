import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/components/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly userService: UsuarioService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.isLoggedUser()) {
        return true;
      } else {
        this.toastr.error('Su sesión ha vencido, por favor ingrese nuevamente.', "Error de sesión")
        this.userService.finalizeSession();
        return false;
      }
  }

}
