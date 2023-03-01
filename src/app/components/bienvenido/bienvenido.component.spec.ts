import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BienvenidoComponent } from './bienvenido.component';

describe('BienvenidoComponent', () => {
  let component: BienvenidoComponent;
  let fixture: ComponentFixture<BienvenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BienvenidoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BienvenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a welcome message', () => {
    const welcomeMessage = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
    expect(welcomeMessage).toContain('Bienvenido a DermoApp!');
  });

  it('should display a list of options', () => {
    const options = fixture.debugElement.queryAll(By.css('.background img'));
    expect(options.length).toBe(3);
  });

  it('should have the correct selector', () => {
    expect(component.selector).toBe('app-bienvenido');
  });
});
