import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankReconcillationReportDetailComponent } from './bank-reconcillation-report-detail.component';

describe('BankReconcillationReportDetailComponent', () => {
  let component: BankReconcillationReportDetailComponent;
  let fixture: ComponentFixture<BankReconcillationReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankReconcillationReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankReconcillationReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
