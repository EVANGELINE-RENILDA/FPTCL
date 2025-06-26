import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceStatusComponent } from './purchase-invoice-status.component';

describe('PurchaseInvoiceStatusComponent', () => {
  let component: PurchaseInvoiceStatusComponent;
  let fixture: ComponentFixture<PurchaseInvoiceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoiceStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseInvoiceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
