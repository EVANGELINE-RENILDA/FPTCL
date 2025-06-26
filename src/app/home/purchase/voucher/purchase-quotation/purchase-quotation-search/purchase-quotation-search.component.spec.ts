import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationSearchComponent } from './purchase-quotation-search.component';

describe('PurchaseQuotationSearchComponent', () => {
  let component: PurchaseQuotationSearchComponent;
  let fixture: ComponentFixture<PurchaseQuotationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseQuotationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseQuotationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
