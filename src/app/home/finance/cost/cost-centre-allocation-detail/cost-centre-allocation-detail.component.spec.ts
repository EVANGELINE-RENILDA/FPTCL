import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCentreAllocationDetailComponent } from './cost-centre-allocation-detail.component';

describe('CostCentreAllocationDetailComponent', () => {
  let component: CostCentreAllocationDetailComponent;
  let fixture: ComponentFixture<CostCentreAllocationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCentreAllocationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCentreAllocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
