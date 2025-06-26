import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherAccountComponent } from './voucher-account.component';

describe('VoucherAccountComponent', () => {
  let component: VoucherAccountComponent;
  let fixture: ComponentFixture<VoucherAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoucherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
