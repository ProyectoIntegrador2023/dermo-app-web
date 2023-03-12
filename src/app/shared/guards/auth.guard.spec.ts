import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/components/usuario/usuario.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioService, ToastrService],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot({
          timeOut: 7000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
