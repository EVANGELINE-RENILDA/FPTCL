import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSummaryReportDetailComponent } from './credit-summary-report-detail.component';

describe('CreditSummaryReportDetailComponent', () => {
  let component: CreditSummaryReportDetailComponent;
  let fixture: ComponentFixture<CreditSummaryReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditSummaryReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditSummaryReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
