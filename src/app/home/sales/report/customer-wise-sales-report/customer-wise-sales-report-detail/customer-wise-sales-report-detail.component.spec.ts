import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseSalesReportDetailComponent } from './customer-wise-sales-report-detail.component';

describe('CustomerWiseSalesReportDetailComponent', () => {
  let component: CustomerWiseSalesReportDetailComponent;
  let fixture: ComponentFixture<CustomerWiseSalesReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerWiseSalesReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerWiseSalesReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
