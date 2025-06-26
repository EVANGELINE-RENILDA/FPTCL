import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailAttachmentComponent } from './customer-detail-attachment.component';

describe('CustomerDetailAttachmentComponent', () => {
  let component: CustomerDetailAttachmentComponent;
  let fixture: ComponentFixture<CustomerDetailAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
