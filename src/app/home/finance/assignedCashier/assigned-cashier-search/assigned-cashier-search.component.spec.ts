import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCashierSearchComponent } from './assigned-cashier-search.component';

describe('AssignedCashierSearchComponent', () => {
  let component: AssignedCashierSearchComponent;
  let fixture: ComponentFixture<AssignedCashierSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedCashierSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedCashierSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
