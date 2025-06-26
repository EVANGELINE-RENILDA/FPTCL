import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSecurityStep4Component } from './payment-security-step4.component';

describe('PaymentSecurityStep4Component', () => {
  let component: PaymentSecurityStep4Component;
  let fixture: ComponentFixture<PaymentSecurityStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSecurityStep4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentSecurityStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
