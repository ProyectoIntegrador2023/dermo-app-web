import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPerfilMedicoComponent } from './crear-perfil-medico.component';

describe('CrearPerfilMedicoComponent', () => {
  let component: CrearPerfilMedicoComponent;
  let fixture: ComponentFixture<CrearPerfilMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPerfilMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPerfilMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
