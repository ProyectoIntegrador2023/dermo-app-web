import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarNavegacionComponent } from './side-bar-navegacion.component';

describe('SideBarNavegacionComponent', () => {
  let component: SideBarNavegacionComponent;
  let fixture: ComponentFixture<SideBarNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarNavegacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
