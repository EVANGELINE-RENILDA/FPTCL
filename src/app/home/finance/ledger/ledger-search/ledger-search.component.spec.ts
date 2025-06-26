import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerSearchComponent } from './ledger-search.component';

describe('LedgerSearchComponent', () => {
  let component: LedgerSearchComponent;
  let fixture: ComponentFixture<LedgerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
