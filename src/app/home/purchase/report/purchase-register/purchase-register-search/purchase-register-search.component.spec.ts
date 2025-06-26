import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRegisterSearchComponent } from './purchase-register-search.component';

describe('PurchaseRegisterSearchComponent', () => {
  let component: PurchaseRegisterSearchComponent;
  let fixture: ComponentFixture<PurchaseRegisterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseRegisterSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseRegisterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
