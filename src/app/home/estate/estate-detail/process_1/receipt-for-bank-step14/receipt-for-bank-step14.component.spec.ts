import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptForBankStep14Component } from './receipt-for-bank-step14.component';

describe('ReceiptForBankStep14Component', () => {
  let component: ReceiptForBankStep14Component;
  let fixture: ComponentFixture<ReceiptForBankStep14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptForBankStep14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptForBankStep14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
