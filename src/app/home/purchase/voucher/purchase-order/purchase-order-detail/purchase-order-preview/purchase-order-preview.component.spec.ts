import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderPreviewComponent } from './purchase-order-preview.component';

describe('PurchaseOrderPreviewComponent', () => {
  let component: PurchaseOrderPreviewComponent;
  let fixture: ComponentFixture<PurchaseOrderPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
