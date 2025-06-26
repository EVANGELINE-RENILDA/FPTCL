import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndReceiptComponent } from './payment-and-receipt.component';

describe('PaymentAndReceiptComponent', () => {
  let component: PaymentAndReceiptComponent;
  let fixture: ComponentFixture<PaymentAndReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAndReceiptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentAndReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
