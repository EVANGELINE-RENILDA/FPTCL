import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceAttachmentComponent } from './sales-invoice-attachment.component';

describe('SalesInvoiceAttachmentComponent', () => {
  let component: SalesInvoiceAttachmentComponent;
  let fixture: ComponentFixture<SalesInvoiceAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInvoiceAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesInvoiceAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
