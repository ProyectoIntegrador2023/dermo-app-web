import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoLesionComponent } from './tipo-lesion.component';

describe('TipoLesionComponent', () => {
  let component: TipoLesionComponent;
  let fixture: ComponentFixture<TipoLesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoLesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoLesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
