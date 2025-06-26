import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderStatusComponent } from './purchase-order-status.component';

describe('PurchaseOrderStatusComponent', () => {
  let component: PurchaseOrderStatusComponent;
  let fixture: ComponentFixture<PurchaseOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
