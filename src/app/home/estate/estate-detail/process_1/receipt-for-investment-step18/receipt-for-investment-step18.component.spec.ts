import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptForInvestmentStep18Component } from './receipt-for-investment-step18.component';

describe('ReceiptForInvestmentStep18Component', () => {
  let component: ReceiptForInvestmentStep18Component;
  let fixture: ComponentFixture<ReceiptForInvestmentStep18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptForInvestmentStep18Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptForInvestmentStep18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
