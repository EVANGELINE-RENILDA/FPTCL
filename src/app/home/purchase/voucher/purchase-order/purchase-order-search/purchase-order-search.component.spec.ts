import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderSearchComponent } from './purchase-order-search.component';

describe('PurchaseOrderSearchComponent', () => {
  let component: PurchaseOrderSearchComponent;
  let fixture: ComponentFixture<PurchaseOrderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
