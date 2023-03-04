/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.logo-nombre').textContent).toContain('Dermo App');
  });

  it('should emit the openRegis event when formRegis is called', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    spyOn(component.openRegis, 'emit');
    component.formRegis();
    expect(component.openRegis.emit).toHaveBeenCalledWith(true);
  });

  it('should emit the openLogin event when formLogin is called', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    spyOn(component.openLogin, 'emit');
    component.formLogin();
    expect(component.openLogin.emit).toHaveBeenCalledWith(true);
  });

  it('should call formLogin method when the "Iniciar sesión" link is clicked', () => {
    spyOn(component, 'formLogin');
    const link = fixture.debugElement.nativeElement.querySelector('.login');
    link.click();
    expect(component.formLogin).toHaveBeenCalled();
  });

  it('should call formRegis method when the "Registrarse" link is clicked', () => {
    spyOn(component, 'formRegis');
    const link = fixture.debugElement.nativeElement.querySelector('.sign-up');
    link.click();
    expect(component.formRegis).toHaveBeenCalled();
  });

});
