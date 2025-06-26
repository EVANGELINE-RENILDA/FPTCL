import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationDetailPreviewComponent } from './purchase-quotation-detail-preview.component';

describe('PurchaseQuotationDetailPreviewComponent', () => {
  let component: PurchaseQuotationDetailPreviewComponent;
  let fixture: ComponentFixture<PurchaseQuotationDetailPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseQuotationDetailPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseQuotationDetailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
