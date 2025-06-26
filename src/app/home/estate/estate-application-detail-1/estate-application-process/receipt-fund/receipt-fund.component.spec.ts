import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptFundComponent } from './receipt-fund.component';

describe('ReceiptFundComponent', () => {
  let component: ReceiptFundComponent;
  let fixture: ComponentFixture<ReceiptFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptFundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
