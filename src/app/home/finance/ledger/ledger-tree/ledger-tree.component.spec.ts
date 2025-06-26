import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerTreeComponent } from './ledger-tree.component';

describe('LedgerTreeComponent', () => {
  let component: LedgerTreeComponent;
  let fixture: ComponentFixture<LedgerTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
