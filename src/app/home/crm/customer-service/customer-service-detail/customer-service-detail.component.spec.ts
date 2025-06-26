import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceDetailComponent } from './customer-service-detail.component';

describe('CustomerServiceDetailComponent', () => {
  let component: CustomerServiceDetailComponent;
  let fixture: ComponentFixture<CustomerServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerServiceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
