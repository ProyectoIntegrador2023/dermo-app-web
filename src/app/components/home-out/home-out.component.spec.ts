import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { UsuarioService } from '../usuario/usuario.service';
import { HomeOutComponent } from './home-out.component';


describe('HomeOutComponent', () => {
  let component: HomeOutComponent;
  let fixture: ComponentFixture<HomeOutComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOutComponent, HeaderComponent ],
      providers: [UsuarioService],
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

});
