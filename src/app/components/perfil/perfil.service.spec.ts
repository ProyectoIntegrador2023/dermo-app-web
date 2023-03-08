/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { PerfilService } from './perfil.service';

describe('Service: Perfil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([PerfilService], (service: PerfilService) => {
    expect(service).toBeTruthy();
  }));
});
