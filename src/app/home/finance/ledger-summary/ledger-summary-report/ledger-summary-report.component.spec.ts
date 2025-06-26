import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerSummaryReportComponent } from './ledger-summary-report.component';

describe('LedgerSummaryReportComponent', () => {
  let component: LedgerSummaryReportComponent;
  let fixture: ComponentFixture<LedgerSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerSummaryReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
