import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationDetailNotesComponent } from './purchase-quotation-detail-notes.component';

describe('PurchaseQuotationDetailNotesComponent', () => {
  let component: PurchaseQuotationDetailNotesComponent;
  let fixture: ComponentFixture<PurchaseQuotationDetailNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseQuotationDetailNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseQuotationDetailNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
