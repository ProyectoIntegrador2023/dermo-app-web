import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/components/usuario/usuario.service';

import { JwtInterceptorService } from './jwt.interceptor.service';

describe('JwtInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtInterceptorService,
      UsuarioService,
      ToastrService
      ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot({
          timeOut: 7000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptorService = TestBed.inject(JwtInterceptorService);
    expect(interceptor).toBeTruthy();
  });
});
