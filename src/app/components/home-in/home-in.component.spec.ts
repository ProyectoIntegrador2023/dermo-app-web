import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderPrivadoComponent } from '../header-privado/header-privado.component';
import { HeaderComponent } from '../header/header.component';
import { SideBarNavegacionComponent } from '../side-bar-navegacion/side-bar-navegacion.component';

import { HomeInComponent } from './home-in.component';

describe('HomeInComponent', () => {
  let component: HomeInComponent;
  let fixture: ComponentFixture<HomeInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        HomeInComponent,
        SideBarNavegacionComponent,
        HeaderComponent,
        HeaderPrivadoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain app-side-bar-navegacion', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-side-bar-navegacion')).toBeTruthy();
  });

  it('should contain app-header-privado', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header-privado')).toBeTruthy();
  });

  it('should contain router-outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

});
