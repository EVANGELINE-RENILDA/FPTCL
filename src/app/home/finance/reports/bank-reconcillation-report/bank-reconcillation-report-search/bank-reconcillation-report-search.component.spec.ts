import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankReconcillationReportSearchComponent } from './bank-reconcillation-report-search.component';

describe('BankReconcillationReportSearchComponent', () => {
  let component: BankReconcillationReportSearchComponent;
  let fixture: ComponentFixture<BankReconcillationReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankReconcillationReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankReconcillationReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
