import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule,  ToastrService } from 'ngx-toastr';
import { CrearPerfilMedicoComponent } from './crear-perfil-medico.component';
import { PerfilService } from '../perfil.service';
import { of } from 'rxjs';


describe('CrearPerfilMedicoComponent', () => {
  let component: CrearPerfilMedicoComponent;
  let fixture: ComponentFixture<CrearPerfilMedicoComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ CrearPerfilMedicoComponent ],
      imports: [
        RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          timeOut: 7000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      providers: [
        FormBuilder,
        ToastrService,
        PerfilService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPerfilMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with required fields', () => {
    jasmine.createSpyObj('PerfilService', {
      'getProfileDoctor': of('mock data'),
      'userProfileDoctor': 'some val'
    });

    expect(component.formCrearPerfilMedico).toBeDefined();
    expect(component.formCrearPerfilMedico.controls['specialty']).toBeDefined();
    expect(component.formCrearPerfilMedico.controls['licenceId']).toBeDefined();
    expect(component.formCrearPerfilMedico.controls['licenceValidityDate']).toBeDefined();
  });

  it('should call getMedicProfile on init', () => {
    jasmine.createSpyObj('PerfilService', {
      'getProfileDoctor': of('mock data'),
      'userProfileDoctor': 'some val'
    });

    spyOn(component, 'getMedicProfile');
    component.ngOnInit();
    expect(component.getMedicProfile).toHaveBeenCalled();
  });


});
