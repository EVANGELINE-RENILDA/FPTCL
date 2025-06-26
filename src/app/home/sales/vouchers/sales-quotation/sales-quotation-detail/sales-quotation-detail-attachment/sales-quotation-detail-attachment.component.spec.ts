import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationDetailAttachmentComponent } from './sales-quotation-detail-attachment.component';

describe('SalesQuotationDetailAttachmentComponent', () => {
  let component: SalesQuotationDetailAttachmentComponent;
  let fixture: ComponentFixture<SalesQuotationDetailAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotationDetailAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesQuotationDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
