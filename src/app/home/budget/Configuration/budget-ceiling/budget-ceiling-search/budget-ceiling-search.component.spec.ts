import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCeilingSearchComponent } from './budget-ceiling-search.component';

describe('BudgetCeilingSearchComponent', () => {
  let component: BudgetCeilingSearchComponent;
  let fixture: ComponentFixture<BudgetCeilingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCeilingSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetCeilingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
