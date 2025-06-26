import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetMonthlyReportComponent } from './balance-sheet-monthly-report.component';

describe('BalanceSheetMonthlyReportComponent', () => {
  let component: BalanceSheetMonthlyReportComponent;
  let fixture: ComponentFixture<BalanceSheetMonthlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceSheetMonthlyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalanceSheetMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
