import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderPrivadoComponent } from './header-privado.component';

describe('HeaderPrivadoComponent', () => {
  let component: HeaderPrivadoComponent;
  let fixture: ComponentFixture<HeaderPrivadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderPrivadoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderPrivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mostrarMenu when onUserIconClick is called', () => {
    const component = new HeaderPrivadoComponent();
    expect(component.mostrarMenu).toBe(false);

    component.onUserIconClick();
    expect(component.mostrarMenu).toBe(true);

    component.onUserIconClick();
    expect(component.mostrarMenu).toBe(false);
  });

  it('should log "Crear perfil" to the console when crearPerfil is called', () => {
    const component = new HeaderPrivadoComponent();
    const consoleSpy = spyOn(console, 'log');

    component.crearPerfil();

    expect(consoleSpy).toHaveBeenCalledWith('Crear perfil');
  });

  it('should log "Crear perfil médico" to the console when crearPerfilMedico is called', () => {
    const component = new HeaderPrivadoComponent();
    const consoleSpy = spyOn(console, 'log');

    component.crearPerfilMedico();

    expect(consoleSpy).toHaveBeenCalledWith('Crear perfil médico');
  });

});
