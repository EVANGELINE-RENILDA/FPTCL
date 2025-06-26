import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoicePreviewComponent } from './purchase-invoice-preview.component';

describe('PurchaseInvoicePreviewComponent', () => {
  let component: PurchaseInvoicePreviewComponent;
  let fixture: ComponentFixture<PurchaseInvoicePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoicePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseInvoicePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
