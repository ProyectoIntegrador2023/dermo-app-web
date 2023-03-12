import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
        HttpClientModule,
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
      name: '',
      age: '',
      country: '',
      city: ''
    });
  });

  it('should mark name field as invalid if it exceeds the maximum length', () => {
    const name = component.formCrearPerfil.controls.name;
    name.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    expect(name.valid).toBeFalsy();
    expect(name.errors?.maxlength).toBeTruthy();
  });


  it('should mark name field as invalid if it does not meet the minimum length', () => {
    const name = component.formCrearPerfil.controls.name;
    name.setValue('Lo');
    expect(name.valid).toBeFalsy();
    expect(name.errors?.minlength).toBeTruthy();
  });

  it('should mark age field as invalid if it does not meet the minimum age', () => {
    const age = component.formCrearPerfil.controls.age;
    age.setValue(17);
    expect(age.valid).toBeFalsy();
    expect(age.errors?.min).toBeTruthy();
  });

  it('should mark age field as invalid if it exceeds the maximum age', () => {
    const age = component.formCrearPerfil.controls.age;
    age.setValue(100);
    expect(age.valid).toBeFalsy();
    expect(age.errors?.max).toBeTruthy();
  });

  it('should mark country field as invalid if it is empty', () => {
    const country = component.formCrearPerfil.controls.country;
    country.setValue('');
    expect(country.valid).toBeFalsy();
    expect(country.errors?.required).toBeTruthy();
  });

  it('should mark city field as invalid if it is empty', () => {
    const city = component.formCrearPerfil.controls.city;
    city.setValue('');
    expect(city.valid).toBeFalsy();
    expect(city.errors?.required).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.formCrearPerfil).toBeDefined();
    expect(component.formCrearPerfil.controls['name']).toBeDefined();
    expect(component.formCrearPerfil.controls['age']).toBeDefined();
    expect(component.formCrearPerfil.controls['country']).toBeDefined();
    expect(component.formCrearPerfil.controls['city']).toBeDefined();

  });

  it('should call onCreatePerfil() function when the form is valid', () => {
    spyOn(component, 'onCreatePerfil');
    component.formCrearPerfil.setValue({
      name: 'Test',
      age: 18,
      country: 'Test country',
      city: 'Test city'
    });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.onCreatePerfil).toHaveBeenCalled();
  });


});
