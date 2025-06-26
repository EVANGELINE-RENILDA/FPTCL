import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCentreAllocationComponent } from './cost-centre-allocation.component';

describe('CostCentreAllocationComponent', () => {
  let component: CostCentreAllocationComponent;
  let fixture: ComponentFixture<CostCentreAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCentreAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCentreAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
