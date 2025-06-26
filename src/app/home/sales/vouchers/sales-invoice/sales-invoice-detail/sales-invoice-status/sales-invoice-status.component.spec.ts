import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceStatusComponent } from './sales-invoice-status.component';

describe('SalesInvoiceStatusComponent', () => {
  let component: SalesInvoiceStatusComponent;
  let fixture: ComponentFixture<SalesInvoiceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInvoiceStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesInvoiceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
