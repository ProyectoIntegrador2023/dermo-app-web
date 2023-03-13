import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HistoriaClinicaComponent } from './historia-clinica.component';

describe('HistoriaClinicaComponent', () => {
  let component: HistoriaClinicaComponent;
  let fixture: ComponentFixture<HistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
