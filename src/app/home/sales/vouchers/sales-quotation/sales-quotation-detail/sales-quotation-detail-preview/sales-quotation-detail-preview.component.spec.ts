import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationDetailPreviewComponent } from './sales-quotation-detail-preview.component';

describe('SalesQuotationDetailPreviewComponent', () => {
  let component: SalesQuotationDetailPreviewComponent;
  let fixture: ComponentFixture<SalesQuotationDetailPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotationDetailPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesQuotationDetailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
