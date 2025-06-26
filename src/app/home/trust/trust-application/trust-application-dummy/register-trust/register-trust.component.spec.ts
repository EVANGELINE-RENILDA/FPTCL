import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTrustComponent } from './register-trust.component';

describe('RegisterTrustComponent', () => {
  let component: RegisterTrustComponent;
  let fixture: ComponentFixture<RegisterTrustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTrustComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterTrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
