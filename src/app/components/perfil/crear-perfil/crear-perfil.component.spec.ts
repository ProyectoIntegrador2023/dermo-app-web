import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { CrearPerfilComponent } from './crear-perfil.component';

describe('CrearPerfilComponent', () => {
  let component: CrearPerfilComponent;
  let fixture: ComponentFixture<CrearPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearPerfilComponent],
      imports: [RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 7000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CrearPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.formCrearPerfil.value).toEqual({
      nombre: '',
      edad: '',
      pais: 1,
      ciudad: ''
    });
  });

  it('should mark fields as invalid if they exceed the maximum length', () => {
    const form = component.formCrearPerfil;
    form.setValue({
      nombre: '12345678901', // 11 characters
      edad: '123', // 3 characters
      pais: 1,
      ciudad: '12345678901' // 11 characters
    });
    expect(form.invalid).toBeTrue();
    expect(form.get('nombre')?.errors?.maxlength).toBeTruthy();
    expect(form.get('edad')?.errors?.maxlength).toBeTruthy();
    expect(form.get('ciudad')?.errors?.maxlength).toBeTruthy();
  });

});
