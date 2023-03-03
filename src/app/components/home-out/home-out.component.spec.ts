import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { HomeOutComponent } from './home-out.component';


describe('HomeOutComponent', () => {
  let component: HomeOutComponent;
  let fixture: ComponentFixture<HomeOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOutComponent, HeaderComponent ]
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
