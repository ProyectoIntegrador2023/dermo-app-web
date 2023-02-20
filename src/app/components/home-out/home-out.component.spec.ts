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
});
