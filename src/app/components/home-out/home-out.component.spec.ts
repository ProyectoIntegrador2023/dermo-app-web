import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { By } from '@angular/platform-browser';
import { HomeOutComponent } from './home-out.component';
import { DebugElement } from '@angular/core';


describe('HomeOutComponent', () => {
  let component: HomeOutComponent;
  let fixture: ComponentFixture<HomeOutComponent>;
  let loginButton: DebugElement;
  let regisButton: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOutComponent, HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginButton = fixture.debugElement.query(By.css('#loginButton'));
    regisButton = fixture.debugElement.query(By.css('#regisButton'));
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
