import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationDetailComponent } from './purchase-quotation-detail.component';

describe('PurchaseQuotationDetailComponent', () => {
  let component: PurchaseQuotationDetailComponent;
  let fixture: ComponentFixture<PurchaseQuotationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseQuotationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseQuotationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
