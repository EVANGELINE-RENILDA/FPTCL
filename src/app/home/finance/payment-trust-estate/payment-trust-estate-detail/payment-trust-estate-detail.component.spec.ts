import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTrustEstateDetailComponent } from './payment-trust-estate-detail.component';

describe('PaymentTrustEstateDetailComponent', () => {
  let component: PaymentTrustEstateDetailComponent;
  let fixture: ComponentFixture<PaymentTrustEstateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentTrustEstateDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentTrustEstateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
