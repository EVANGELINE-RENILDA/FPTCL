import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRequestSearchComponent } from './budget-request-search.component';

describe('BudgetRequestSearchComponent', () => {
  let component: BudgetRequestSearchComponent;
  let fixture: ComponentFixture<BudgetRequestSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetRequestSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetRequestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
