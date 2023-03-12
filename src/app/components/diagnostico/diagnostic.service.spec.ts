import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DiagnosticService } from "./diagnostic.service";

describe('DiagnosticService', () => {
  let service: DiagnosticService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DiagnosticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
