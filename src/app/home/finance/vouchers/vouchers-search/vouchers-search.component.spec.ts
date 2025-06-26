import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersSearchComponent } from './vouchers-search.component';

describe('VouchersSearchComponent', () => {
  let component: VouchersSearchComponent;
  let fixture: ComponentFixture<VouchersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VouchersSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VouchersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
