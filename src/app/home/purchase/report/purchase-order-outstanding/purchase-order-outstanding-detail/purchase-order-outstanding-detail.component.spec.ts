import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderOutstandingDetailComponent } from './purchase-order-outstanding-detail.component';

describe('PurchaseOrderOutstandingDetailComponent', () => {
  let component: PurchaseOrderOutstandingDetailComponent;
  let fixture: ComponentFixture<PurchaseOrderOutstandingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderOutstandingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderOutstandingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
