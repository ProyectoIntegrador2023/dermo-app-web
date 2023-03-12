import { TestBed } from '@angular/core/testing';

import { DiagnosticService } from "./diagnostic.service";

describe('EnviarDiagnosticoService', () => {
  let service: DiagnosticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
