import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRegisterDetailComponent } from './purchase-register-detail.component';

describe('PurchaseRegisterDetailComponent', () => {
  let component: PurchaseRegisterDetailComponent;
  let fixture: ComponentFixture<PurchaseRegisterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseRegisterDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseRegisterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
