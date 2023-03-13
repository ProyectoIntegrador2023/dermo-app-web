import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposReporteComponent } from './tipos-reporte.component';

describe('TiposReporteComponent', () => {
  let component: TiposReporteComponent;
  let fixture: ComponentFixture<TiposReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
