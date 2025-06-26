import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptWillFeeComponent } from './receipt-will-fee.component';

describe('ReceiptWillFeeComponent', () => {
  let component: ReceiptWillFeeComponent;
  let fixture: ComponentFixture<ReceiptWillFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptWillFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptWillFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
