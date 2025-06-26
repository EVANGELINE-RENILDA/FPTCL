import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetLoopComponent } from './balance-sheet-loop.component';

describe('BalanceSheetLoopComponent', () => {
  let component: BalanceSheetLoopComponent;
  let fixture: ComponentFixture<BalanceSheetLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceSheetLoopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalanceSheetLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
