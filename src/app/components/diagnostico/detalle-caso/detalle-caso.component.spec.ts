import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { DetalleCasoComponent } from './detalle-caso.component';
import {FormsModule} from "@angular/forms";

describe('DetalleCasoComponent', () => {
  let component: DetalleCasoComponent;
  let fixture: ComponentFixture<DetalleCasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCasoComponent ],
      imports:[
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ToastrModule.forRoot({
          timeOut: 7000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
