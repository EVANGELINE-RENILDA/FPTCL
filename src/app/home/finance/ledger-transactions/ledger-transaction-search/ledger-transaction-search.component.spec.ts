import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerTransactionSearchComponent } from './ledger-transaction-search.component';

describe('LedgerTransactionSearchComponent', () => {
  let component: LedgerTransactionSearchComponent;
  let fixture: ComponentFixture<LedgerTransactionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerTransactionSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerTransactionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
