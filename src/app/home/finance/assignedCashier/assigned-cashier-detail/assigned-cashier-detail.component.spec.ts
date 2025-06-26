import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCashierDetailComponent } from './assigned-cashier-detail.component';

describe('AssignedCashierDetailComponent', () => {
  let component: AssignedCashierDetailComponent;
  let fixture: ComponentFixture<AssignedCashierDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedCashierDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedCashierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
