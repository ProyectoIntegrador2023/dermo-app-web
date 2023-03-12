import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CasosComponent } from './casos.component';
import {FormsModule} from "@angular/forms";

describe('CasosComponent', () => {
  let component: CasosComponent;
  let fixture: ComponentFixture<CasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasosComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
