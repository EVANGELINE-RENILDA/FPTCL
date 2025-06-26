import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetConfigurationSearchComponent } from './budget-configuration-search.component';

describe('BudgetConfigurationSearchComponent', () => {
  let component: BudgetConfigurationSearchComponent;
  let fixture: ComponentFixture<BudgetConfigurationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetConfigurationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetConfigurationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
