import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWillHighCourtComponent } from './register-will-high-court.component';

describe('RegisterWillHighCourtComponent', () => {
  let component: RegisterWillHighCourtComponent;
  let fixture: ComponentFixture<RegisterWillHighCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterWillHighCourtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterWillHighCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
