import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseSalesReportSearchComponent } from './customer-wise-sales-report-search.component';

describe('CustomerWiseSalesReportSearchComponent', () => {
  let component: CustomerWiseSalesReportSearchComponent;
  let fixture: ComponentFixture<CustomerWiseSalesReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerWiseSalesReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerWiseSalesReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
