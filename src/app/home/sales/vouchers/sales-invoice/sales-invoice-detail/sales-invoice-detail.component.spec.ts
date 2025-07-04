import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceDetailComponent } from './sales-invoice-detail.component';

describe('SalesInvoiceDetailComponent', () => {
  let component: SalesInvoiceDetailComponent;
  let fixture: ComponentFixture<SalesInvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInvoiceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
