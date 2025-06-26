import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRequestDetailComponent } from './budget-request-detail.component';

describe('BudgetRequestDetailComponent', () => {
  let component: BudgetRequestDetailComponent;
  let fixture: ComponentFixture<BudgetRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetRequestDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
