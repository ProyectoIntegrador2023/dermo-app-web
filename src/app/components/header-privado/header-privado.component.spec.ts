import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPrivadoComponent } from './header-privado.component';

describe('HeaderPrivadoComponent', () => {
  let component: HeaderPrivadoComponent;
  let fixture: ComponentFixture<HeaderPrivadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderPrivadoComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderPrivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
