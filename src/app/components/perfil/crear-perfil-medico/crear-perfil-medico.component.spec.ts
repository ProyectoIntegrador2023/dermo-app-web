import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule,  ToastrService } from 'ngx-toastr';

import { CrearPerfilMedicoComponent } from './crear-perfil-medico.component';

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
        HttpClientModule,
        ToastrModule.forRoot({
          timeOut: 7000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      providers: [ToastrService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPerfilMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
