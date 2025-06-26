import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCeilingDetailComponent } from './budget-ceiling-detail.component';

describe('BudgetCeilingDetailComponent', () => {
  let component: BudgetCeilingDetailComponent;
  let fixture: ComponentFixture<BudgetCeilingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCeilingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetCeilingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
