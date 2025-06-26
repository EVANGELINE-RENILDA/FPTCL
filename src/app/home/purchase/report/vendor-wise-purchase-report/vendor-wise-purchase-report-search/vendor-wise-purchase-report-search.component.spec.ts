import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorWisePurchaseReportSearchComponent } from './vendor-wise-purchase-report-search.component';

describe('VendorWisePurchaseReportSearchComponent', () => {
  let component: VendorWisePurchaseReportSearchComponent;
  let fixture: ComponentFixture<VendorWisePurchaseReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorWisePurchaseReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorWisePurchaseReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
