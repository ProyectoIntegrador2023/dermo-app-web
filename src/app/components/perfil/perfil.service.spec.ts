/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { PerfilService } from './perfil.service';

describe('Service: Perfil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([PerfilService], (service: PerfilService) => {
    expect(service).toBeTruthy();
  }));
});
