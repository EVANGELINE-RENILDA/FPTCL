import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptForInvestmentStep16Component } from './receipt-for-investment-step16.component';

describe('ReceiptForInvestmentStep16Component', () => {
  let component: ReceiptForInvestmentStep16Component;
  let fixture: ComponentFixture<ReceiptForInvestmentStep16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptForInvestmentStep16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptForInvestmentStep16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
