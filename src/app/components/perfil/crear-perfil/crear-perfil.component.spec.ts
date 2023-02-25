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
});
