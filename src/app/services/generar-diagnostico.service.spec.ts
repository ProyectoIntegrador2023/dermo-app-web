import { TestBed } from '@angular/core/testing';

import { GenerarDiagnosticoService } from './generar-diagnostico.service';

describe('GenerarDiagnosticoService', () => {
  let service: GenerarDiagnosticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarDiagnosticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
