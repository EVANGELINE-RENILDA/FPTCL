import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderOutstandingSearchComponent } from './purchase-order-outstanding-search.component';

describe('PurchaseOrderOutstandingSearchComponent', () => {
  let component: PurchaseOrderOutstandingSearchComponent;
  let fixture: ComponentFixture<PurchaseOrderOutstandingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderOutstandingSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderOutstandingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
