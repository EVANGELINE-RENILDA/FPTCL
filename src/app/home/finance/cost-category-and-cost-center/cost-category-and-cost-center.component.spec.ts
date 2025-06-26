import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCategoryAndCostCenterComponent } from './cost-category-and-cost-center.component';

describe('CostCategoryAndCostCenterComponent', () => {
  let component: CostCategoryAndCostCenterComponent;
  let fixture: ComponentFixture<CostCategoryAndCostCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCategoryAndCostCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCategoryAndCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
