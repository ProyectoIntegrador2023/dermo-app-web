import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { INJURY_REPORT_ENDPOINT } from 'src/environments/environment';
import { UsuarioService } from 'src/app/components/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private readonly userService: UsuarioService,
    private readonly toastr: ToastrService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const sessionToken = sessionStorage.getItem('token') || '';
    const isLoggedIn = this.userService.isLoggedUser();
    const isUrlNoTokenNeeded = request.url.startsWith(INJURY_REPORT_ENDPOINT.baseEndpoint) || request.url.includes('assets/');
    if (isLoggedIn && !isUrlNoTokenNeeded) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${sessionToken}` }
        });
    }

    return next.handle(request).pipe( tap(() => null,
    (err: unknown) => {
      console.error('Interceptor error ', err);
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      if(isLoggedIn) {
        this.toastr.error('Su sesión ha vencido, por favor ingrese nuevamente.', "Error de sesión - token")
        this.userService.finalizeSession();
      }
    }
  }));
  }

}
