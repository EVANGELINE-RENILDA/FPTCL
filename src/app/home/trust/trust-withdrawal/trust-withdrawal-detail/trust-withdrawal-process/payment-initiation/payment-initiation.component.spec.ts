import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInitiationComponent } from './payment-initiation.component';

describe('PaymentInitiationComponent', () => {
  let component: PaymentInitiationComponent;
  let fixture: ComponentFixture<PaymentInitiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentInitiationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
