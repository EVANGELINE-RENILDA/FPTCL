import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderDetailPreviewComponent } from './sales-order-detail-preview.component';

describe('SalesOrderDetailPreviewComponent', () => {
  let component: SalesOrderDetailPreviewComponent;
  let fixture: ComponentFixture<SalesOrderDetailPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderDetailPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesOrderDetailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
