import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTrustEstateSearchComponent } from './payment-trust-estate-search.component';

describe('PaymentTrustEstateSearchComponent', () => {
  let component: PaymentTrustEstateSearchComponent;
  let fixture: ComponentFixture<PaymentTrustEstateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentTrustEstateSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentTrustEstateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
