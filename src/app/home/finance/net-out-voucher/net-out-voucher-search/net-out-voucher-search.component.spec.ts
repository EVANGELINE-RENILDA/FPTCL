import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetOutVoucherSearchComponent } from './net-out-voucher-search.component';

describe('NetOutVoucherSearchComponent', () => {
  let component: NetOutVoucherSearchComponent;
  let fixture: ComponentFixture<NetOutVoucherSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetOutVoucherSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetOutVoucherSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
