import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerSummaryDetailComponent } from './ledger-summary-detail.component';

describe('LedgerSummaryDetailComponent', () => {
  let component: LedgerSummaryDetailComponent;
  let fixture: ComponentFixture<LedgerSummaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerSummaryDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
