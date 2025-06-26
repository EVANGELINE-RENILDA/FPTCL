import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsSummarySearchComponent } from './debtors-summary-search.component';

describe('DebtorsSummarySearchComponent', () => {
  let component: DebtorsSummarySearchComponent;
  let fixture: ComponentFixture<DebtorsSummarySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsSummarySearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebtorsSummarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
