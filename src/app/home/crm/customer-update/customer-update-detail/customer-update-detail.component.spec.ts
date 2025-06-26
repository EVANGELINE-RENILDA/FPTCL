import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateDetailComponent } from './customer-update-detail.component';

describe('CustomerUpdateDetailComponent', () => {
  let component: CustomerUpdateDetailComponent;
  let fixture: ComponentFixture<CustomerUpdateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdateDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerUpdateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
