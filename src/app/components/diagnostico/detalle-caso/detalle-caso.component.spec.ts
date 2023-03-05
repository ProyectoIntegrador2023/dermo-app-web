import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCasoComponent } from './detalle-caso.component';

describe('DetalleCasoComponent', () => {
  let component: DetalleCasoComponent;
  let fixture: ComponentFixture<DetalleCasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCasoComponent ],
      imports:[HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
