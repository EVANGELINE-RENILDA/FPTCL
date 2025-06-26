import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailAddressComponent } from './customer-detail-address.component';

describe('CustomerDetailAddressComponent', () => {
  let component: CustomerDetailAddressComponent;
  let fixture: ComponentFixture<CustomerDetailAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
