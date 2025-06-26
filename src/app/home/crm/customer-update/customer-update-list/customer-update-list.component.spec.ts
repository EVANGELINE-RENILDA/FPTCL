import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateListComponent } from './customer-update-list.component';

describe('CustomerUpdateListComponent', () => {
  let component: CustomerUpdateListComponent;
  let fixture: ComponentFixture<CustomerUpdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
