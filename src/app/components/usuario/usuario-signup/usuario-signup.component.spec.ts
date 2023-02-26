/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { UsuarioSignupComponent } from './usuario-signup.component';

describe('UsuarioSignupComponent', () => {
  let component: UsuarioSignupComponent;
  let fixture: ComponentFixture<UsuarioSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioSignupComponent ],
      imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 7000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeSignUp event when close() is called', () => {
    const component = fixture.componentInstance;
    spyOn(component.closeSignUp, 'emit');
    component.close();
    expect(component.closeSignUp.emit).toHaveBeenCalledWith(false);
  });

});
