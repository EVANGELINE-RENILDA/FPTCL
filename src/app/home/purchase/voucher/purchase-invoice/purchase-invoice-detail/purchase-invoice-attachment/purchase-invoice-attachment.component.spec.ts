import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceAttachmentComponent } from './purchase-invoice-attachment.component';

describe('PurchaseInvoiceAttachmentComponent', () => {
  let component: PurchaseInvoiceAttachmentComponent;
  let fixture: ComponentFixture<PurchaseInvoiceAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoiceAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseInvoiceAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
