import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetReviewSearchComponent } from './budget-review-search.component';

describe('BudgetReviewSearchComponent', () => {
  let component: BudgetReviewSearchComponent;
  let fixture: ComponentFixture<BudgetReviewSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetReviewSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetReviewSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
