import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationDetailAttachmentComponent } from './purchase-quotation-detail-attachment.component';

describe('PurchaseQuotationDetailAttachmentComponent', () => {
  let component: PurchaseQuotationDetailAttachmentComponent;
  let fixture: ComponentFixture<PurchaseQuotationDetailAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseQuotationDetailAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseQuotationDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
