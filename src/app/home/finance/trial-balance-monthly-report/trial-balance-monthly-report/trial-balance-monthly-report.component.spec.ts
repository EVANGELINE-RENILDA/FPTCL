import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialBalanceMonthlyReportComponent } from './trial-balance-monthly-report.component';

describe('TrialBalanceMonthlyReportComponent', () => {
  let component: TrialBalanceMonthlyReportComponent;
  let fixture: ComponentFixture<TrialBalanceMonthlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialBalanceMonthlyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialBalanceMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
