import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { UsuarioService } from '../usuario/usuario.service';
import { HomeOutComponent } from './home-out.component';


describe('HomeOutComponent', () => {
  let component: HomeOutComponent;
  let fixture: ComponentFixture<HomeOutComponent>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;


  beforeEach(async () => {
    usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', ['finalizeSession']);

    await TestBed.configureTestingModule({
      declarations: [ HomeOutComponent, HeaderComponent ],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceSpy }
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set login to true when eventLogin is called', () => {
    component.eventLogin(true);
    expect(component.login).toEqual(true);
  });

  it('should set regis to true when eventRegis is called', () => {
    component.eventRegis(true);
    expect(component.regis).toEqual(true);
  });

  it('should initialize UsuarioService in constructor', () => {
    const usuarioService = TestBed.inject(UsuarioService);
    const component = fixture.componentInstance;
    expect(component['usuarioService']).toBe(usuarioService);
  });

  it('should render HeaderComponent', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should call eventLogin when openLogin event is emitted from app-header', () => {
    const spy = spyOn(component, 'eventLogin');
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent)).componentInstance;
    headerComponent.openLogin.emit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call eventRegis when openRegis event is emitted from app-header', () => {
    const spy = spyOn(component, 'eventRegis');
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent)).componentInstance;
    headerComponent.openRegis.emit();
    expect(spy).toHaveBeenCalled();
  });

  it('should have the correct text in the element with class text-tratamiento', () => {
    const textTratamiento = fixture.debugElement.query(By.css('.text-tratamiento')).nativeElement;
    expect(textTratamiento.textContent).toContain('Visualiza tu agenda y selecciona los casos de tu especialidad');
  });

});
