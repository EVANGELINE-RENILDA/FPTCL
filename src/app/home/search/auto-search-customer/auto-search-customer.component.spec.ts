import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSearchCustomerComponent } from './auto-search-customer.component';

describe('AutoSearchCustomerComponent', () => {
  let component: AutoSearchCustomerComponent;
  let fixture: ComponentFixture<AutoSearchCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoSearchCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoSearchCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
