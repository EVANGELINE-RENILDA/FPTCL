import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsSummaryDetailComponent } from './debtors-summary-detail.component';

describe('DebtorsSummaryDetailComponent', () => {
  let component: DebtorsSummaryDetailComponent;
  let fixture: ComponentFixture<DebtorsSummaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsSummaryDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebtorsSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
