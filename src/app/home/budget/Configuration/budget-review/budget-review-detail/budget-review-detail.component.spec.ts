import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetReviewDetailComponent } from './budget-review-detail.component';

describe('BudgetReviewDetailComponent', () => {
  let component: BudgetReviewDetailComponent;
  let fixture: ComponentFixture<BudgetReviewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetReviewDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
