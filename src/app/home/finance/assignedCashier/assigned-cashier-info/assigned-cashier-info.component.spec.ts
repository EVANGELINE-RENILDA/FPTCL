import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCashierInfoComponent } from './assigned-cashier-info.component';

describe('AssignedCashierInfoComponent', () => {
  let component: AssignedCashierInfoComponent;
  let fixture: ComponentFixture<AssignedCashierInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedCashierInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedCashierInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
