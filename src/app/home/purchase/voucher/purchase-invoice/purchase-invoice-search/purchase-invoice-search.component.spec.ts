import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceSearchComponent } from './purchase-invoice-search.component';

describe('PurchaseInvoiceSearchComponent', () => {
  let component: PurchaseInvoiceSearchComponent;
  let fixture: ComponentFixture<PurchaseInvoiceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoiceSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseInvoiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
