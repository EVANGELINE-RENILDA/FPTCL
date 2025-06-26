import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialBalanceLoopComponent } from './trial-balance-loop.component';

describe('TrialBalanceLoopComponent', () => {
  let component: TrialBalanceLoopComponent;
  let fixture: ComponentFixture<TrialBalanceLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialBalanceLoopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialBalanceLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
