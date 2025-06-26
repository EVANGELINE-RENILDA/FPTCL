import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSummaryReportSearchComponent } from './credit-summary-report-search.component';

describe('CreditSummaryReportSearchComponent', () => {
  let component: CreditSummaryReportSearchComponent;
  let fixture: ComponentFixture<CreditSummaryReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditSummaryReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditSummaryReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
