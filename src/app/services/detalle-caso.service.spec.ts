import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DetalleCasoService } from './detalle-caso.service';

describe('DetalleCasoService', () => {
  let service: DetalleCasoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(DetalleCasoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
