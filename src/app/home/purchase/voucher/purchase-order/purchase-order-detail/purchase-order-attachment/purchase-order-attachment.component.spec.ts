import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderAttachmentComponent } from './purchase-order-attachment.component';

describe('PurchaseOrderAttachmentComponent', () => {
  let component: PurchaseOrderAttachmentComponent;
  let fixture: ComponentFixture<PurchaseOrderAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
