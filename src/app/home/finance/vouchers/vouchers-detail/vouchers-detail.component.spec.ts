import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersDetailComponent } from './vouchers-detail.component';

describe('VouchersDetailComponent', () => {
  let component: VouchersDetailComponent;
  let fixture: ComponentFixture<VouchersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VouchersDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VouchersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
