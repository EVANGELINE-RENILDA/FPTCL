import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerTransactionsForTrustSearchComponent } from './ledger-transactions-for-trust-search.component';

describe('LedgerTransactionsForTrustSearchComponent', () => {
  let component: LedgerTransactionsForTrustSearchComponent;
  let fixture: ComponentFixture<LedgerTransactionsForTrustSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerTransactionsForTrustSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerTransactionsForTrustSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
