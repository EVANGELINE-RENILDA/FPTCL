import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceFormComponent } from './customer-service-form.component';

describe('CustomerServiceFormComponent', () => {
  let component: CustomerServiceFormComponent;
  let fixture: ComponentFixture<CustomerServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerServiceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
