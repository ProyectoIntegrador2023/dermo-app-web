import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SideBarNavegacionComponent } from './side-bar-navegacion.component';

describe('SideBarNavegacionComponent', () => {
  let component: SideBarNavegacionComponent;
  let fixture: ComponentFixture<SideBarNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ SideBarNavegacionComponent ]
    })
    .compileComponents();

  });

  beforeEach(()=> {
    fixture = TestBed.createComponent(SideBarNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(links.length).toBe(4);
    expect(links[0].nativeElement.textContent).toContain('Inicio');
    expect(links[1].nativeElement.textContent).toContain('Diagnostico');
    expect(links[2].nativeElement.textContent).toContain('Agenda');
    expect(links[3].nativeElement.textContent).toContain('Reportes');
  });

});
