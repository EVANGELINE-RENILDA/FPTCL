import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCeilingLoopComponent } from './budget-ceiling-loop.component';

describe('BudgetCeilingLoopComponent', () => {
  let component: BudgetCeilingLoopComponent;
  let fixture: ComponentFixture<BudgetCeilingLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCeilingLoopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetCeilingLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
