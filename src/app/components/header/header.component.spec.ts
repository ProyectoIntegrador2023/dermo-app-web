/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
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

  it('should render navigation links correctly', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.links-primary:nth-child(1)').textContent).toContain('Registrarse');
    expect(compiled.querySelector('.links-primary:nth-child(2)').textContent).toContain('Iniciar sesión');
  });

  it('should call formRegis method when the "Registrarse" link is clicked', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    spyOn(component, 'formRegis');
    const registerLink = fixture.debugElement.query(By.css('.links-primary:nth-child(1)')).nativeElement;
    registerLink.click();
    expect(component.formRegis).toHaveBeenCalled();
  });

  it('should call formLogin method when the "Iniciar sesión" link is clicked', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    spyOn(component, 'formLogin');
    const loginLink = fixture.debugElement.query(By.css('.links-primary:nth-child(2)')).nativeElement;
    loginLink.click();
    expect(component.formLogin).toHaveBeenCalled();
  });

});
