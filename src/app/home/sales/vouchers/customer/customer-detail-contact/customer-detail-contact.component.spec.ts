import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailContactComponent } from './customer-detail-contact.component';

describe('CustomerDetailContactComponent', () => {
  let component: CustomerDetailContactComponent;
  let fixture: ComponentFixture<CustomerDetailContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
