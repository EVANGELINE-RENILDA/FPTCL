import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetConfigurationDetailComponent } from './budget-configuration-detail.component';

describe('BudgetConfigurationDetailComponent', () => {
  let component: BudgetConfigurationDetailComponent;
  let fixture: ComponentFixture<BudgetConfigurationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetConfigurationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetConfigurationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
