import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetOutVoucherDetailComponent } from './net-out-voucher-detail.component';

describe('NetOutVoucherDetailComponent', () => {
  let component: NetOutVoucherDetailComponent;
  let fixture: ComponentFixture<NetOutVoucherDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetOutVoucherDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetOutVoucherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
