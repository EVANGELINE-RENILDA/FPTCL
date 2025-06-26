import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorWisePurchaseReportDetailComponent } from './vendor-wise-purchase-report-detail.component';

describe('VendorWisePurchaseReportDetailComponent', () => {
  let component: VendorWisePurchaseReportDetailComponent;
  let fixture: ComponentFixture<VendorWisePurchaseReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorWisePurchaseReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorWisePurchaseReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
