import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderDetailAttachmentComponent } from './sales-order-detail-attachment.component';

describe('SalesOrderDetailAttachmentComponent', () => {
  let component: SalesOrderDetailAttachmentComponent;
  let fixture: ComponentFixture<SalesOrderDetailAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderDetailAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesOrderDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
